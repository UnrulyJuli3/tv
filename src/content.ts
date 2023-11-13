import { Program } from "acorn";
import { replaceConnectContent, replaceModeratorContent } from "./contentRoot";

export const replaceScriptContent = (app: string, root: Program) => {
    switch (app) {
        case "@connect": replaceConnectContent(root); break;
        case "@moderator": replaceModeratorContent(root); break;
    }
};