import { createApp } from "vue";

import AssetsView from "./AssetsView.vue";

export const createAssetsView = () => {
    const container = document.createElement("div");
    container.className = "tv-app-assets";
    document.body.appendChild(container);

    const app = createApp(AssetsView);
    app.mount(container);
};