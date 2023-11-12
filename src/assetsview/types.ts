export type IAssetManifest = Record<string, IAssetBranch>;

export type IAssetBranch = Record<string, IAssetBundle>;

export interface IAssetBundle {
    file: string;
    css: string[];
    base: string;
    version?: string;
    assets: string[];
    fonts: IBundledFont[];
}

export interface IBundledFont {
    hash: string;
    name: string;
    assets: string[];
}