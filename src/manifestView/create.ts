import { createApp } from "vue";

import ManifestView from "./ManifestView.vue";

export const createManifestView = () => {
    const container = document.createElement("div");
    container.className = "tv-app-manifest";
    document.body.appendChild(container);

    const app = createApp(ManifestView);
    app.mount(container);
};