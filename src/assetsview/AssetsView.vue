<script lang="ts">
import { defineComponent } from "vue";
import { IAssetManifest, IBundledFont } from "./types";
import { TV } from "../tv";

type assetType = "image" | "font" | "other" | "ignore";

let globalFontCanvas = window.document.createElement("canvas");

export default defineComponent({
    data() {
        return {
            data: <IAssetManifest | null>null,
            selectedBranch: "main",
            isLoadingBundle: false,
            selectedBundle: <{ branch: string; bundle: string; } | null>null,
            checkedAssets: new Map<string, assetType>(),
            checkingAssets: <string[]>[],
            loadedFonts: <string[]>[],
            checkingFonts: <string[]>[],
            maxDummyTextSize: 80,
            bannedImagesOrFonts: <string[]>[
                // icon fonts present in most old games
                // "assets/13634da8.eot", "assets/fe185d11.woff2", "assets/a26394f7.woff", "assets/e3950440.ttf", "assets/42f60659.svg", "assets/e4299464.eot", "assets/8ea87917.woff2", "assets/f9217f66.woff", "assets/cda59d6e.ttf", "assets/a3b98177.svg", "assets/79d08806.eot", "assets/e42a8844.woff2", "assets/cb9e9e69.woff", "assets/e8711bbb.ttf", "assets/be0a0849.svg", "assets/373c04fd.eot", "assets/9834b82a.woff2", "assets/3f6d3488.woff", "assets/af639750.ttf", "assets/9674eb1b.svg",
                // icon font present in awshirt2
                // "assets/c239fbd2.woff",
            ],
            unsupportedDummyDisplayFonts: [
                "340d2673", // Halflings
                "f4bb136b", // Font Awesome 5 Brands
                "cc700f47", // Font Awesome 5 Free
                "7d07dba7", // Font Awesome 5 Free
                "8cc9d84e", // swiper-icons (awshirt2)
            ],
            unsupportedFamilyDisplayFonts: [
                "340d2673", // Halflings
                "f4bb136b", // Font Awesome 5 Brands
                "cc700f47", // Font Awesome 5 Free
                "7d07dba7", // Font Awesome 5 Free
                "d28a74ff", // Glyphs (pushthebutton)
                "8cc9d84e", // swiper-icons (awshirt2)
                "55cf38fc", // Pixhelado (risky-text)
            ],
        };
    },
    computed: {
        bundles() {
            if (!this.data) return null;
            return this.data[this.selectedBranch];
        },
        bundle() {
            if (!this.data || !this.selectedBundle) return null;
            return this.data[this.selectedBundle.branch][this.selectedBundle.bundle];
        },
    },
    methods: {
        selectBundle(name: string) {
            if (!this.bundles || this.isLoadingBundle) return;

            this.selectedBundle = {
                branch: this.selectedBranch,
                bundle: name,
            };

            this.checkAssets();

            if (import.meta.env.DEV) {
                console.log(this.$data);
            }
        },
        getFontFamily(font: IBundledFont) {
            return `tv-font-${font.hash}`;
        },
        getDummyDisplayText(font: IBundledFont) {
            switch (font.hash) {
                case "d28a74ff": // Glyphs (pushthebutton)
                    return "HWD";
                case "55cf38fc": // Pixhelado (risky-text)
                    return "123";
                default:
                    return "Abc";
            }
        },
        shouldShowDummyDisplayText(font: IBundledFont) {
            return !this.unsupportedDummyDisplayFonts.includes(font.hash);
        },
        shouldUseFamilyDisplayFont(font: IBundledFont) {
            return !this.unsupportedFamilyDisplayFonts.includes(font.hash);
        },
        getDummyTextSize(font: IBundledFont) {
            const ctx = globalFontCanvas.getContext("2d")!;
            ctx.font = `${this.maxDummyTextSize}px ${this.getFontFamily(font)}`;
            const { width } = ctx.measureText(this.getDummyDisplayText(font));
            return Math.min(this.maxDummyTextSize, 120 / width * this.maxDummyTextSize);
        },
        checkAssets() {
            const bundle = this.bundle;
            if (!bundle) return;

            bundle.assets.forEach(async asset => {
                if (this.checkingAssets.includes(asset)) return;
                this.checkingAssets.push(asset);

                let type: assetType = "other";

                // ignore font assets that are already handled by fonts
                if (bundle.fonts.some(font => font.assets.includes(asset))) {
                    type = "ignore";
                } else {
                    if (!this.bannedImagesOrFonts.includes(asset)) {
                        if (/\.(?:a?png|jpe?g|gif|avif|webp|svg)$/i.test(asset)) type = "image";
                        // else if (/\.(?:woff2?|eot|ttf|otf)$/i.test(asset)) type = "font";
                        /* else if (/\.svg$/i.test(asset)) {
                            const content = await fetch(`${TV.base}/${bundle.base}/${asset}?t=${Date.now()}`),
                                text = await content.text();

                            if (text.includes("<font-face")) type = "font";
                            else if (!text.startsWith("url(")) type = "image";
                        } */
                    }
                }

                this.checkedAssets.set(asset, type);
            });

            bundle.fonts.forEach(async font => {
                if (this.checkingFonts.includes(font.hash)) return;
                this.checkingFonts.push(font.hash);

                const fontFace = new FontFace(this.getFontFamily(font), font.assets.map(asset => `url(${this.getPath(asset)})`).join(", "));
                window.document.fonts.add(fontFace);

                await fontFace.load();
                this.loadedFonts.push(font.hash);
            });
        },
        getAssetType(asset: string) {
            return this.checkedAssets.get(asset);
        },
        getAssetsOfType(assets: string[], type: assetType) {
            return assets.filter(asset => this.checkedAssets.has(asset) && this.getAssetType(asset) === type);
        },
        getImageAssets(assets: string[]) {
            return this.getAssetsOfType(assets, "image");
        },
        getOtherAssets(assets: string[]) {
            return this.getAssetsOfType(assets, "other");
        },
        isImage(asset: string) {
            return this.getAssetType(asset) === "image";
        },
        isOther(asset: string) {
            return this.getAssetType(asset) === "other";
        },
        getLoadedFonts(fonts: IBundledFont[]) {
            return fonts.filter(font => this.loadedFonts.includes(font.hash));
        },
        getPath(asset: string) {
            if (!this.bundle) return asset;
            return `${TV.base}/${this.bundle.base}/${asset}`;
        },
    },
    watch: {
        selectedBundle(val, prevVal) {
            if (prevVal && val.branch === prevVal.branch && val.bundle === prevVal.bundle) return;
            window.location.hash = "";
        },
    },
    async mounted() {
        window.location.hash = "";
        this.isLoadingBundle = true;
        this.data = await TV.getAssets();
        this.isLoadingBundle = false;
    },
});
</script>

<template>
    <div class="main" v-if="data">
        <div class="picker">
            <select v-model="selectedBranch" class="branch">
                <option v-for="branch in Object.keys(data)" :value="branch">{{ branch }}</option>
            </select>
            <template v-if="bundles">
                <button v-for="bundle in Object.keys(bundles)" @click="selectBundle(bundle)" :disabled="isLoadingBundle">{{ bundle }}</button>
            </template>
        </div>
        <div class="viewer" v-if="bundle && !isLoadingBundle" :key="bundle.base">
            <div class="title">{{ bundle.base }}</div>
            <div class="images">
                <template v-for="font in getLoadedFonts(bundle.fonts)">
                    <a v-if="shouldShowDummyDisplayText(font)" class="asset" :href="`#${getFontFamily(font)}`">
                        <div class="font" :style="{ fontFamily: getFontFamily(font), fontSize: `${getDummyTextSize(font)}px` }">{{ getDummyDisplayText(font) }}</div>
                    </a>
                </template>
                <a v-for="asset in getImageAssets(bundle.assets)" class="asset" target="_blank" :href="getPath(asset)">
                    <!-- <div class="image" :style="{ backgroundImage: `url(${getPath(asset)})` }"></div> -->
                    <img class="image" :src="getPath(asset)" />
                </a>
            </div>
            <div class="other" v-if="getOtherAssets(bundle.assets).length">
                <a target="_blank" v-for="asset in getOtherAssets(bundle.assets)" class="asset" :href="getPath(asset)">{{ asset }}</a>
            </div>
            <div class="fonts" v-if="getLoadedFonts(bundle.fonts).length">
                <template v-for="font in getLoadedFonts(bundle.fonts)">
                    <div class="name">
                        <div :class="{ text: true, long: font.name.length >= 16, xlong: font.name.length >= 28 }" :id="getFontFamily(font)" :style="{ fontFamily: shouldUseFamilyDisplayFont(font) ? getFontFamily(font) : '' }">{{ font.name }}</div>
                    </div>
                    <a target="_blank" v-for="asset in font.assets" class="asset" :href="getPath(asset)">{{ asset }}</a>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap");

.main * {
    box-sizing: border-box;
    font-family: "Space Grotesk", Arial, Helvetica, sans-serif;
    line-height: 1;
}

.main {
    display: flex;
    height: 100%;
    overflow: hidden;

    .picker {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        overflow: auto;

        .branch {
            padding: 4px 12px;
            font-size: 16px;
        }

        button {
            padding: 4px 12px;
            font-size: 16px;
            cursor: pointer;
        }
    }

    .viewer {
        flex-grow: 1;
        overflow: auto;
    }
}

.title {
    text-align: center;
    padding: 30px 10px;
    font-size: 24px;
    font-weight: 700;
    color: #fff;
}

.images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .asset {
        width: 120px;
        height: 120px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        margin: 10px;

        /* .image {
            flex-grow: 1;
            height: 100%;
            background: none no-repeat center / contain;
        } */

        .image {
            max-width: 100%;
            max-height: 100%;
        }

        .font {
            text-align: center;
            // font-size: 64px;
            color: #fff;
        }

        &:hover {
            opacity: 0.5;
        }
    }
}

.other {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid #8c939c;
    padding: 20px 26px 0;

    &:last-child {
        padding-bottom: 20px;
    }

    .asset {
        display: inline-block;
        width: 100%;
        padding: 6px 0;
        color: #fff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}

.fonts {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 20px;
    border-top: 1px solid #8c939c;
    padding: 20px 26px 20px;

    .name {
        &:not(:first-child) {
            margin-top: 40px;
        }

        .text {
            font-size: 36px;
            color: #fff;
            border-radius: 4px;
            padding: 6px 0;
            display: inline-block;
            text-align: left;

            &.long {
                font-size: 24px;
            }

            &.xlong {
                font-size: 18px;
            }

            &:target {
                animation: 1.6s cubic-bezier(0.76, 0, 0.24, 1) 1s backwards name-highlight-padding,
                    0.8s cubic-bezier(0.5, 0, 0.75, 0) 1s backwards name-highlight-background;

                @keyframes name-highlight-background {
                    0% {
                        background: #3241ce;
                    }
                }

                @keyframes name-highlight-padding {
                    0% {
                        padding: 6px 8px;
                    }
                }
            }
        }
    }

    .asset {
        display: inline-block;
        width: 100%;
        padding: 6px 0;
        color: #fff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}
</style>