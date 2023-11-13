interface IManifest {
    mods: IModInfo[];
}

interface IModInfo {
    id: string;
    type: string;
}

type ReplacementManifest = Record<string, IReplacementDetails>;

interface IReplacementDetails {
    assets?: Record<string, string>;
    strings?: Record<string, string>;
}

interface IReplacements {
    assets: Map<string, string>;
    strings: Map<string, string>;
}

export class Mods {
    // public static root: string = "https://raw.githubusercontent.com/TheDarkSid3r/tv-mods/main";
    public static root: string = "https://thedarksid3r.github.io/tv-mods";

    private static manifest: IManifest;
    public static replacements: ReplacementManifest[] = [];

    public static async load() {
        /* const res = await fetch(`${this.root}/manifest.json?t=${Date.now()}`);
        this.manifest = await res.json();

        await Promise.all(this.manifest.mods.map(info => this.loadMod(info)));

        console.log(this.manifest);
        console.log(this.replacements); */
    }

    private static async loadMod(info: IModInfo) {
        const path = `${this.root}/mods/${info.id}`;
        switch (info.type) {
            case "replacement": {
                const replacements: ReplacementManifest = await (await fetch(`${path}/replacements.json?t=${Date.now()}`)).json();
                console.log(replacements);
                for (const app in replacements) {
                    if (replacements[app].assets) {
                        for (const key in replacements[app].assets) replacements[app].assets![key] = `${path}/assets/${replacements[app].assets![key]}`;
                    }
                }
                this.replacements.push(replacements);
                break;
            }
        }
    }

    public static getReplacementsForApp(app: string): IReplacements {
        const assets: Map<string, string> = new Map(),
            strings: Map<string, string> = new Map();

        this.replacements.forEach(apps => {
            const info = apps[app];

            if (!info) return;

            if (info.assets) Object.keys(info.assets).forEach(key => {
                if (assets.has(key)) console.warn(`Overwriting asset key "${key}"`);
                assets.set(key, info.assets![key]);
            });

            if (info.strings) Object.keys(info.strings).forEach(key => {
                if (strings.has(key)) console.warn(`Overwriting string key "${key}"`);
                strings.set(key, info.strings![key]);
            });
        });

        return {
            assets,
            strings,
        };
    }
}