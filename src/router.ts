import { TV } from "./tv";

export interface IRoute {
    path?: string | string[];
    load?: string;
    redirect?: string;
    debugLoad?: string;
    autoMount?: boolean;
    handler?: (match: IRouterMatch) => IRoute | void;
}

export interface IRouterSite {
    routes: IRoute[];
}

export interface IRouterMatch {
    url: string;
    route: IRoute;
    path: string;
    parts: string[];
    data: any;
    params: Record<string, string>;
    hashString: string;
    queryString: string;
}

interface IGetRouteResult {
    route: IRoute;
    parts: string[];
}

const paramTest = /^:/;

export class Router {
    private tv: TV;
    private routes: IRoute[];

    constructor(tv: TV, e: IRoute[]) {
        this.tv = tv;
        this.routes = e;
        this.resolve();
    }

    public resolve() {
        const r = this.getMatch(window.location.pathname);
        this.executeMatch(r);
    }

    private executeMatch(e?: IRouterMatch) {
        const r = e?.route.handler?.(e) ?? e?.route;

        if (!e || !r) {
            this.redirect("/", e);
            return;
        }

        if (r.debugLoad) {
            // this.tv.debugLoad(r.debugLoad, e);
            return
        }

        if (r.load) {
            this.tv.load({
                app: r.load,
                match: e,
                autoMount: e.route.autoMount ?? true,
            });
            return;
        }

        if (e.route.redirect) {
            this.redirect(e.route.redirect, e);
            return;
        }

        if (!e.route.handler) {
            console.error(e);
            throw new Error("[Router] Unable to execute match");
        }
    }

    private redirect(e: string, r?: IRouterMatch) {
        const n = this.getMatch(e);

        if (!n) throw new Error("[Router] Redirecting to an unexpected path causes an infinite redirect loop");

        if (r) {
            if (!n.hashString) n.hashString = r.hashString;
            if (!n.params) n.params = r.params;
            if (!n.queryString) n.queryString = r.queryString;
        }

        window.history.replaceState(null, "", e);
        this.executeMatch(n);
    }

    private splitPath(e: string) {
        return e.replace(/^\s*\/*\s*|\s*\/*\s*$/g, "").split("/");
    }

    private matchRouteToPath(e: string[], r: string[]) {
        if (e.length !== r.length) return false;

        for (let n = 0; n < e.length; n++) {
            if (!paramTest.test(e[n]) && e[n] !== r[n]) return false;
        }

        return true;
    }

    private getRoute(e: string, r: IRoute[]): IGetRouteResult | void {
        const n = this.splitPath(e);

        for (let i = 0; i < r.length; i++) {
            const o: string[] = Array.isArray(r[i].path) ? r[i].path as string[] : [r[i].path as string];
            for (let s = 0; s < o.length; s++) {
                const a = this.splitPath(o[s]);
                if (this.matchRouteToPath(a, n)) return {
                    route: r[i],
                    parts: a,
                };
            }
        }
    }

    private parseData(e: string, r: IGetRouteResult) {
        const n: Record<string, string> = {},
            i = this.splitPath(e);

        for (let o = 0; o < r.parts.length; o++) {
            if (paramTest.test(r.parts[o])) n[r.parts[o].replace(paramTest, "")] = i[o];
        }

        return n;
    }

    private getMatch(e: string) {
        const n = this.getRoute(e, this.routes);

        if (!n) return;

        const queryString = document.location.search;

        const i: IRouterMatch = {
            url: document.location.href,
            route: n.route,
            path: n.parts.join("/"),
            parts: n.parts,
            data: this.parseData(e, n),
            params: Object.fromEntries(new URLSearchParams(queryString)),
            hashString: document.location.hash.replace(/^#/, ""),
            queryString,
        };

        return i;
    }
}