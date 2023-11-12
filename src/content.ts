import { replaceConnectContent, replaceModeratorContent } from "./contentRoot";

export const replaceScriptContent = (app: string, content: string) => {
    switch (app) {
        case "@connect": return replaceConnectContent(content);
        case "@moderator": return replaceModeratorContent(content);
    }

    return content;
};