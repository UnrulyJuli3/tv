import { replaceScriptContent } from "./content";
import { setupStorage } from "./storage";
import { replaceStyleContent } from "./style";
import { IManifest } from "./types";
// import { createUtils } from "./utils/create";

interface IRegisterOptions {
    connect?: (e: any, r?: any) => Promise<any>;
    mount?: (options: IMountOptions) => (() => void);
    info?: (options: IMountOptions) => any;
}

interface ILoadOptions {
    app: string;
    match?: any;
    branch?: string;
    autoMount?: boolean;
}

interface IMountOptions {
    app: string;
    room?: any;
    match: any;
    version?: string;
    type?: string;
    branch?: string;
    welcome?: any;
}

const tokenChars = "abcdefghijklmnopqrstuvwxyz";

const createAppId = (app: string) => {
    let token: string = "";
    for (let i = 0; i < 8; i++) token += Math.random() < 0.5 ? Math.floor(Math.random() * 10) : tokenChars.charAt(Math.floor(Math.random() * tokenChars.length));
    return `app-${token}`;
};

export class TV {
    // private static base: string = "https://tv-bundles.s3.us-west-1.amazonaws.com";
    // @ts-ignore
    // public static base: string = TV_BUNDLES_ROOT || "https://bundles.sid3r.net";
    public static base: string = "https://bundles.sid3r.net";

    public manifest: IManifest;

    private registered?: IRegisterOptions;
    private registeredApp?: HTMLDivElement;
    private lastApp?: HTMLDivElement;
    private app?: HTMLDivElement;
    private prefetched?: string[];
    private onRegister?: () => void;
    private unmount?: () => void;

    constructor(manifest: IManifest) {
        this.manifest = manifest;
        this.manifest.environment = "production";
    }

    public static async create() {
        const res = await fetch(new URL(`/manifest.json?t=${Date.now()}`, TV.base)),
            manifest = await res.json();

        return new TV(manifest);
    }

    public static async getAssets() {
        let assetsName = "assets";

        const query = new URLSearchParams(window.location.search);
        if (query.has("ext")) assetsName += `-${query.get("ext")}`;

        const res = await fetch(new URL(`/${assetsName}.json?t=${Date.now()}`, TV.base)),
            data = await res.json();

        return data;
    }

    public getGame = (identifier: string) => this.manifest.games.find(game => {
        if (game.tag === identifier) return true;
        if (game.galleryId === identifier) return true;
        if (game.categoryId === identifier) return true;
        return false;
    });

    public register = (options: IRegisterOptions) => {
        this.registered = options;
        this.onRegister?.();
    };

    private loadScript(content: string) {
        const script = window.document.createElement("script");
        script.textContent = content;
        script.async = true;
        script.type = "module";
        script.crossOrigin = "";
        // script.setAttribute("data-tv-script", "");
        script.setAttribute("data-tv-register", "");
        window.document.head.append(script);
        // console.log(content);
    }

    /* private prefetchStyle(content: string) {
        const link = window.document.createElement("link");
        link.rel = "prefetch";
        link.textContent = content;
        link.setAttribute("data-tv-prefetch", "");
        window.document.head.append(link);
    } */

    /* private prefetchStyle(href: string) {
        const link = window.document.createElement("link");
        link.rel = "prefetch";
        link.href = href;
        link.setAttribute("data-tv-prefetch", "");
        window.document.head.append(link);
    } */

    /* private branchHasBundle(branch: string, bundle: string) {
        if (!this.manifest.branches[branch]) return false;
        if (!this.manifest.branches[branch].bundles[bundle]) return false;
        return true;
    } */

    private getBranchName(options: ILoadOptions) {
        if (options.branch) return options.branch;

        /* const branches = Object.keys(this.manifest.branches)
            .sort((a, b) => this.manifest.branches[b].lastUpdated - this.manifest.branches[a].lastUpdated)
            .filter(branch => this.branchHasBundle(branch, options.app));

        if (branches.length) return branches[0]; */

        return "main";
    }

    public load = async (options: ILoadOptions) => {
        console.log("[loader]", options);

        /* const promptResult = await (window as any).tv.app.prompt({
            app: options.app,
            branch: options.branch ?? "main",
            branches: Object.keys(this.manifest.branches)
                .filter(branch => this.manifest.branches[branch]?.bundles[options.app])
                .sort((a, b) => this.manifest.branches[b].lastUpdated - this.manifest.branches[a].lastUpdated)
                .map(branch => ({ branch, version: this.manifest.branches[branch].bundles[options.app].version ?? this.manifest.branches[branch].version })),
        }); */

        // window.document.querySelectorAll("link[data-tv-prefetch]").forEach(a => a.remove());
        window.document.querySelectorAll("script[data-tv-register]").forEach(s => s.remove());

        const branch = this.manifest.branches[this.getBranchName(options)],
            bundle = branch.bundles[options.app];
        /* const branch = this.manifest.branches[promptResult.branch],
            bundle = branch.bundles[options.app]; */

        if (!bundle) throw new Error(`[loader] Invalid app "${options.app}"`);

        const appId = createAppId(options.app);

        window.document.querySelector(`#${appId}`)?.remove();
        const app = window.document.createElement("div");
        app.id = appId;
        app.className = "tv-app";
        window.document.body.append(app);

        this.registeredApp?.remove();
        this.registeredApp = app;
        /* this.lastApp = this.app;
        this.app = app; */

        this.prefetched = await Promise.all(bundle.css.map(async file => {
            const stylePath = new URL(`/${bundle.base}/${file}?t=${Date.now()}`, TV.base),
                res = await fetch(stylePath),
                text = await res.text();

            const contentReplacements = text
                .replace("#app", `#${appId}`);

            // this.prefetchStyle(replaceStyleContent(options.app, contentReplacements));
            return replaceStyleContent(options.app, contentReplacements);
        }));

        // bundle.css.forEach(file => this.prefetchStyle(new URL(`/${bundle.base}/${file}`, TV.base).href));

        const scriptPath = new URL(`/${bundle.base}/${bundle.file}?t=${Date.now()}`, TV.base),
            res = await fetch(scriptPath),
            text = await res.text();

        const contentReplacements = text
            .replace(/new [A-Za-z0-9_$]+\.WSClient\(/g, "window.tv.client=$&")
            .replace(/^\/\/\# sourceMappingURL=.*$/m, "")
            .replace(`"#app"`, `"#${appId}"`);
        // .replaceAll("location.reload(", "tv.reload(");

        this.onRegister = () => {
            delete this.onRegister;
            if (options.autoMount) {
                const mountOptions: any = options;
                mountOptions.version = bundle.version || branch.version;
                this.mount(mountOptions);
            }
        };

        this.loadScript(replaceScriptContent(options.app, contentReplacements));
    };

    public connect = async (e: any, r?: any) => {
        if (!this.registered?.connect) throw new Error("[loader] There is not a registered connect function");
        const res = await this.registered.connect(e, r);
        /* const token = window.localStorage.getItem(`${(window as any).tv.storage.namespace}:token`);
        const client = (window as any).tv.client;
        if (token && client) {
            client.mail(1, {
                twitchToken: token,
            });
        } */
        return res;
    };

    public mount = async (options: IMountOptions) => {
        if (!this.registered?.mount) throw new Error("[loader] There is not a registered mount function");

        window.document.querySelector("div.tv-loader")?.remove();
        window.document.querySelectorAll("input").forEach(input => input.blur());

        setupStorage(options.app, options.room?.code);

        window.document.querySelectorAll("script[data-tv-script],style[data-tv-style]").forEach(s => s.remove());

        window.document.querySelectorAll("script[data-tv-register]").forEach(s => {
            s.removeAttribute("data-tv-register");
            s.setAttribute("data-tv-script", "");
        });

        // unknown styles (likely injected by app script) -> data-tv-style
        window.document.querySelectorAll("style:not([data-tv-style]):not([data-tv-source])").forEach(style => style.setAttribute("data-tv-style", ""));

        this.prefetched?.forEach(content => {
            const style = window.document.createElement("style");
            style.textContent = content;
            style.setAttribute("data-tv-style", "");
            window.document.head.append(style);
        });

        delete this.prefetched;

        /* await Promise.all(
            Array.from(window.document.querySelectorAll("link[data-tv-prefetch]"))
                .map(prefetch => new Promise<void>(resolve => {
                    const style = window.document.createElement("link");
                    style.rel = "stylesheet";
                    style.href = (prefetch as any).href;
                    style.setAttribute("data-tv-style", "");
                    window.document.head.append(style);
                    prefetch.remove();
                    style.addEventListener("load", () => resolve());
                })),
        ); */

        this.lastApp = this.app;
        this.app = this.registeredApp;
        delete this.registeredApp;

        this.unmount?.();
        this.lastApp?.remove();

        this.app?.classList.add("tv-active");
        this.unmount = this.registered.mount(options);

        // if (!/^@/.test(options.app)) createUtils();
    };
}