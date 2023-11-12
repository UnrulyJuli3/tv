import { TV } from "./tv";
import "./style.scss";
import "./tv.style.css";
import { setupStorage } from "./storage";
import { createAssetsView } from "./assetsview/create";
import { IRoute, Router } from "./router";
// import { createApp } from "vue";
// import TVApp from "./tv/App.vue";

window.document.querySelector("html")?.classList.add("js");

const loader = document.createElement("div");
loader.className = "tv-loader";
document.body.append(loader);

TV.create().then(tv => {
    window.document.querySelectorAll("style").forEach(style => style.setAttribute("data-tv-source", ""));
    // console.log(`Loaded manifest (${Object.keys(tv.manifest.branches).join(", ")})`);

    const proxy: any = {
        manifest: tv.manifest,
        register: tv.register,
        load: tv.load,
        connect: tv.connect,
        mount: tv.mount,
    };

    (window as any).tv = proxy;

    (window as any).gtag = (type: string, eventName: string, params: any) => {
        if (type === "event") console.log(`[gtag] ${eventName}`, params);
    };

    setupStorage();

    const routes: IRoute[] = [
        {
            path: "/",
            load: "@connect",
        },
        {
            path: "/audience",
            load: "@connect",
        },
        {
            path: "/teeko",
            load: "@teeko-web",
        },
        {
            path: "/moderator",
            load: "@moderator",
        },
        {
            path: "/moderator/hj",
            load: "@moderator",
        },
        {
            path: "/assets",
            handler: () => {
                createAssetsView();
            },
        },
        {
            path: "/gallery/:galleryId/:artifactId",
            handler: match => {
                const game = tv.getGame(match.data.galleryId);

                if (game?.categoryId) {
                    match.data.categoryId = game.categoryId;
                    return {
                        load: game.tag,
                    };
                }

                return {
                    redirect: "/",
                };
            },
        },
    ];

    const router = new Router(tv, routes);

    /* proxy.reload = () => {
        proxy.client?.disconnect();
        delete proxy.client;
        router.resolve();
        // window.location.reload();
    }; */
});