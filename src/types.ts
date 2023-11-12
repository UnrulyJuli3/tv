export interface IManifest {
    environment: string;
    version: number;
    loader: ILoader;
    branches: Record<string, IBranch>;
    games: IGame[];
}

export interface ILoader {
    branch: string;
    sha: string;
    lastUpdated: number;
    version: string;
    type: string;
}

export interface IBranch {
    sha: string;
    lastUpdated: number;
    version: string;
    type: string;
    bundles: Record<string, IBundle>;
}

export interface IBundle {
    file: string;
    css: string[];
    base: string;
    version?: string;
}

export interface IGame {
    name?: string;
    tag: string;
    wrapper: "vue" | "marionette";
    isPublic: boolean;
    directory: string;
    features?: ("camera" | "kicking" | "moderation" | "previews" | "dropInDropOut")[];
    categoryId?: string;
    galleryId?: string;
    shopItems?: ("cards" | "mugs" | "shirts")[];
}