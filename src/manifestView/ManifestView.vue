<script lang="ts">
import { defineComponent } from "vue";
import ManifestBranch from "./ManifestBranch.vue";

export default defineComponent({
    data() {
        return {
            manifest: (window as any).tv.manifest,
            // newManifest: <any | null>null,
            newManifest: JSON.parse(`{"environment":"qa","version":1,"loader":{"branch":"main","sha":"215c822cd18352437031fcebbaa140a64f14ab32","lastUpdated":1701475203763,"version":"5.352.130","type":"production"},"branches":{"main":{"sha":"215c822cd18352437031fcebbaa140a64f14ab32","lastUpdated":1701475203763,"version":"5.352.130","type":"production","bundles":{"@connect":{"file":"4479d295.js","css":["assets/fc1c5527.css"],"base":"main/@connect","version":"5.343.128"},"the-wheel":{"file":"101d135e.js","css":["assets/46b94a6f.css"],"base":"main/pp8-the-wheel","version":"5.94.0"},"drawful-animate":{"file":"86c6e843.js","css":["assets/ce7372e9.css"],"base":"main/pp8-drawful-animate","version":"5.229.113"},"@moderator":{"file":"9b615d95.js","css":["assets/feea9943.css"],"base":"main/@moderator","version":"5.344.128"},"awshirt-tjsp":{"file":"08a2204a.js","css":["assets/3d52b2fc.css"],"base":"main/tjsp-awshirt","version":"5.256.119"},"ecast-test-client":{"file":"c12562a3.js","css":["assets/f88dcee1.css"],"base":"main/internal-ecast-test-client","version":"5.0.0"},"drawful":{"file":"7f1f5688.js","css":["assets/8c85f556.css"],"base":"main/pp1-drawful","version":"5.0.0"},"fibbage":{"file":"13493e46.js","css":["assets/d6877282.css"],"base":"main/pp1-fibbage","version":"5.0.0"},"lieswatter":{"file":"09a27e0e.js","css":["assets/a7ece1cd.css"],"base":"main/pp1-lieswatter","version":"5.0.0"},"wordspud":{"file":"af18ff28.js","css":["assets/0daf9c6a.css"],"base":"main/pp1-wordspud","version":"5.0.0"},"ydkj2015":{"file":"db1903af.js","css":["assets/d93bd31e.css"],"base":"main/pp1-ydkj2015","version":"5.0.0"},"auction":{"file":"9603dfdb.js","css":["assets/53e73c8c.css"],"base":"main/pp2-auction","version":"5.11.0"},"bombintern":{"file":"0a23956d.js","css":["assets/66256807.css"],"base":"main/pp2-bombintern","version":"5.10.0"},"earwax":{"file":"bf8c3f65.js","css":["assets/a0c65c75.css"],"base":"main/pp2-earwax","version":"5.23.0"},"fibbage2":{"file":"ac8326b7.js","css":["assets/6216f6ba.css"],"base":"main/pp2-fibbage2","version":"5.3.0"},"quiplash":{"file":"d2012756.js","css":["assets/fbee8a88.css"],"base":"main/pp2-quiplash","version":"5.10.0"},"awshirt":{"file":"f2516dba.js","css":["assets/a347404d.css"],"base":"main/pp3-awshirt","version":"5.10.0"},"fakinit":{"file":"50590e67.js","css":["assets/dac2a7f5.css"],"base":"main/pp3-fakinit","version":"5.3.0"},"pollposition":{"file":"f4b8a270.js","css":["assets/3c11a541.css"],"base":"main/pp3-pollposition","version":"5.3.0"},"quiplash2":{"file":"305e136e.js","css":["assets/05d6176b.css"],"base":"main/pp3-quiplash2","version":"5.10.0"},"triviadeath":{"file":"9c21aecf.js","css":["assets/802aa443.css"],"base":"main/pp3-triviadeath","version":"5.10.0"},"bracketeering":{"file":"fdc9b4aa.js","css":["assets/18c3096c.css"],"base":"main/pp4-bracketeering","version":"5.3.0"},"fibbage3":{"file":"ad176341.js","css":["assets/ec7c6a80.css"],"base":"main/pp4-fibbage3","version":"5.3.0"},"monstermingle":{"file":"4925b508.js","css":["assets/17b960b9.css"],"base":"main/pp4-monstermingle","version":"5.3.0"},"overdrawn":{"file":"9bdac96a.js","css":["assets/8faf3ab8.css"],"base":"main/pp4-overdrawn","version":"5.3.0"},"survivetheinternet":{"file":"0decf411.js","css":["assets/2f12472e.css"],"base":"main/pp4-survivetheinternet","version":"5.3.0"},"patentlystupid":{"file":"9a5dff35.js","css":["assets/28702884.css"],"base":"main/pp5-patentlystupid","version":"5.3.0"},"rapbattle":{"file":"932ac320.js","css":["assets/bdb9d910.css"],"base":"main/pp5-rapbattle","version":"5.3.0"},"slingshoot":{"file":"54445497.js","css":["assets/a9f2fe13.css"],"base":"main/pp5-slingshoot","version":"5.3.0"},"splittheroom":{"file":"4a870950.js","css":["assets/434f3aa9.css"],"base":"main/pp5-splittheroom","version":"5.3.0"},"ydkj2018":{"file":"a64e92e4.js","css":["assets/d64bce13.css"],"base":"main/pp5-ydkj2018","version":"5.3.0"},"jokeboat":{"file":"b2eb6ee3.js","css":["assets/cab22b2a.css"],"base":"main/pp6-jokeboat","version":"5.3.0"},"pushthebutton":{"file":"f4cd4045.js","css":["assets/0827dcc8.css"],"base":"main/pp6-pushthebutton","version":"5.0.0"},"ridictionary":{"file":"f666ae6b.js","css":["assets/357522ed.css"],"base":"main/pp6-ridictionary","version":"5.3.0"},"rolemodels":{"file":"4a30e3cb.js","css":["assets/dc76367e.css"],"base":"main/pp6-rolemodels","version":"5.25.0"},"triviadeath2":{"file":"434dfef5.js","css":["assets/ff07affb.css"],"base":"main/pp6-triviadeath2","version":"5.3.0"},"blanky-blank":{"file":"be6a67a5.js","css":["assets/ed2b2329.css"],"base":"main/pp7-blanky-blank","version":"5.3.0"},"everyday":{"file":"afbcf9e6.js","css":["assets/0ca00280.css"],"base":"main/pp7-everyday","version":"5.3.0"},"jackbox-talks":{"file":"1c7ff2d7.js","css":["assets/a3589513.css"],"base":"main/pp7-jackboxtalks","version":"5.25.0"},"quiplash3":{"file":"3778fb2c.js","css":["assets/ad6fa12c.css"],"base":"main/pp7-quiplash3","version":"5.18.0"},"worldchamps":{"file":"c1f67222.js","css":["assets/5b8b201c.css"],"base":"main/pp7-worldchamps","version":"5.144.39"},"acquisitions-inc":{"file":"864030f3.js","css":["assets/c974410a.css"],"base":"main/standalone-acquisitions-inc","version":"5.3.0"},"drawful2international":{"file":"7f620ee6.js","css":["assets/7837c756.css"],"base":"main/standalone-drawful2-international","version":"5.3.0"},"drawful2":{"file":"3e4cf35a.js","css":["assets/9f4642a8.css"],"base":"main/standalone-drawful2","version":"5.10.0"},"guesspionage-crowdplay":{"file":"d8e22d89.js","css":["assets/1abe6b0a.css"],"base":"main/standalone-guesspionage-crowdplay","version":"5.0.0"},"quiplash2-international":{"file":"cb27e125.js","css":["assets/1b07f574.css"],"base":"main/standalone-quiplash2-international","version":"5.3.0"},"survey-bomb":{"file":"68d527a5.js","css":["assets/bc77cc37.css"],"base":"main/pp8-survey-bomb","version":"5.94.0"},"triviadeath2-tjsp":{"file":"c1edf0d4.js","css":["assets/8feed284.css"],"base":"main/tjsp-triviadeath2","version":"5.256.119"},"murder-detectives":{"file":"8733ee7e.js","css":["assets/0cbe6885.css"],"base":"main/pp8-murder-detectives","version":"5.0.0"},"quiplash3-tjsp":{"file":"a7b366d4.js","css":["assets/04c3545a.css"],"base":"main/tjsp-quiplash3","version":"5.229.113"},"apply-yourself":{"file":"36ab8997.js","css":["assets/ec87b7c0.css"],"base":"main/pp8-apply-yourself","version":"5.0.0"},"antique-freak":{"file":"eaedd0a5.js","css":["assets/012be2f0.css"],"base":"main/pp9-antique-freak","version":"5.94.0"},"fourbage":{"file":"ede80981.js","css":["assets/3f080adc.css"],"base":"main/pp9-fourbage","version":"5.94.0"},"htmf":{"file":"8fff6456.js","css":["assets/bef7e801.css"],"base":"main/pp9-htmf","version":"5.94.0"},"lineup":{"file":"c904806e.js","css":["assets/3c3165f6.css"],"base":"main/pp9-lineup","version":"5.297.119"},"range-game":{"file":"0030cbea.js","css":["assets/90a8e693.css"],"base":"main/pp9-range-game","version":"5.94.0"},"prototype":{"file":"4e79db28.js","css":["assets/1b64379c.css"],"base":"main/internal-prototype","version":"5.91.0"},"@teeko-web":{"file":"667039f0.js","css":["assets/d265e3c4.css"],"base":"main/@teeko-web","version":"5.276.119"},"awshirt2":{"file":"caaa3b8d.js","css":["assets/7594ff3c.css"],"base":"main/pp10-awshirt2","version":"5.348.128"},"nopus-opus":{"file":"f56a178f.js","css":["assets/3a63e449.css"],"base":"main/pp10-nopus-opus","version":"5.349.128"},"risky-text":{"file":"53f39d89.js","css":["assets/d7e322e7.css"],"base":"main/pp10-risky-text","version":"5.352.130"},"time-trivia":{"file":"3e041cec.js","css":["assets/e80df281.css"],"base":"main/pp10-time-trivia","version":"5.348.128"},"us-them":{"file":"079617a6.js","css":["assets/a3244aaa.css"],"base":"main/pp10-us-them","version":"5.348.128"}}},"cookie-banner":{"sha":"f56d787e4e59ea1a4d481c6e2dc3bc660093296d","lastUpdated":1690835212613,"version":"5.229.6-cookie-banner.rc","type":"production","bundles":{"@connect":{"file":"d0985e86.js","css":["assets/6d3b5174.css"],"base":"cookie-banner/@connect"},"@teeko-web":{"file":"7c99a3b8.js","css":["assets/2760509c.css"],"base":"cookie-banner/@teeko-web"},"drawful-animate":{"file":"26d4ad2f.js","css":["assets/3b8a0b93.css"],"base":"cookie-banner/pp8-drawful-animate"},"quiplash3-tjsp":{"file":"7a577683.js","css":["assets/ce1f60ec.css"],"base":"cookie-banner/tjsp-quiplash3"}}},"nopus-connect":{"sha":"948afb22723fbdefbbbd6f0980706ff57fd346b6","lastUpdated":1691629332877,"version":"5.237.4-nopus-connect.rc","type":"production","bundles":{"@connect":{"file":"8afcd119.js","css":["assets/47c4743a.css"],"base":"nopus-connect/@connect"},"nopus-opus":{"file":"40e884b8.js","css":["assets/feb71381.css"],"base":"nopus-connect/pp10-nopus-opus"}}},"consistent-reconnect":{"sha":"620c8aa0cb8c48483aae6034064da5e5c457346e","lastUpdated":1693599277794,"version":"5.259.4-consistent-reconnect.rc","type":"production","bundles":{"@connect":{"file":"ffedcf3a.js","css":["assets/03150171.css"],"base":"consistent-reconnect/@connect"}}},"gallery-loader":{"sha":"af797288f41f642083aacf4875d2563d08307854","lastUpdated":1694807755989,"version":"5.265.2-gallery-loader.rc","type":"production","bundles":{"@connect":{"file":"5d9fe5de.js","css":["assets/b7405389.css"],"base":"gallery-loader/@connect"},"@moderator":{"file":"0ab891d4.js","css":["assets/dd21570e.css"],"base":"gallery-loader/@moderator"},"@teeko-web":{"file":"41b1c7e9.js","css":["assets/ce8a5b4f.css"],"base":"gallery-loader/@teeko-web"},"nopus-opus":{"file":"8c845965.js","css":["assets/bd4c208f.css"],"base":"gallery-loader/pp10-nopus-opus"}}},"artifacts-fix":{"sha":"0bf3b0b61a6fb2a0e3b8aa90fb0c47ff2a1baa58","lastUpdated":1697676679988,"version":"5.297.2-artifacts-fix.rc","type":"production","bundles":{"@connect":{"file":"2f7cdaa6.js","css":["assets/02fa9bcc.css"],"base":"artifacts-fix/@connect"}}},"new-post":{"sha":"ac08f3e47962a0430df89dbd5b959518939ef9bb","lastUpdated":1697689079170,"version":"5.297.28-new-post.rc","type":"production","bundles":{"@connect":{"file":"7bba9fcd.js","css":["assets/e81c8794.css"],"base":"new-post/@connect"},"awshirt2":{"file":"168be932.js","css":["assets/d25c5f57.css"],"base":"new-post/pp10-awshirt2"},"nopus-opus":{"file":"f4c84ebd.js","css":["assets/fa858d6f.css"],"base":"new-post/pp10-nopus-opus"},"risky-text":{"file":"b3da6fc3.js","css":["assets/77c122f2.css"],"base":"new-post/pp10-risky-text"},"time-trivia":{"file":"96e3da81.js","css":["assets/fd2b913e.css"],"base":"new-post/pp10-time-trivia"},"us-them":{"file":"6372572c.js","css":["assets/8df1818b.css"],"base":"new-post/pp10-us-them"},"lineup":{"file":"56bda711.js","css":["assets/c6753421.css"],"base":"new-post/pp9-lineup"}}},"optional-refs":{"sha":"9f11f88d79cb61698f96ac0462de70bb8df24a04","lastUpdated":1698704412171,"version":"5.315.2-optional-refs.rc","type":"production","bundles":{"risky-text":{"file":"d270bef8.js","css":["assets/bdfdba91.css"],"base":"optional-refs/pp10-risky-text"}}},"remaining-galleries":{"sha":"bd376dce2d5bf5e229626acea6c2ac880db81d66","lastUpdated":1700113644546,"version":"5.331.33-remaining-galleries.rc","type":"production","bundles":{"awshirt2":{"file":"4db57a77.js","css":["assets/9e1452c9.css"],"base":"remaining-galleries/pp10-awshirt2"},"nopus-opus":{"file":"1d9fc4da.js","css":["assets/b3e013b3.css"],"base":"remaining-galleries/pp10-nopus-opus"},"risky-text":{"file":"381341c6.js","css":["assets/775ae2ca.css"],"base":"remaining-galleries/pp10-risky-text"},"time-trivia":{"file":"19e7c6cf.js","css":["assets/42954337.css"],"base":"remaining-galleries/pp10-time-trivia"},"us-them":{"file":"95851141.js","css":["assets/e04bcbb5.css"],"base":"remaining-galleries/pp10-us-them"},"@moderator":{"file":"4ad505ac.js","css":["assets/b542722d.css"],"base":"remaining-galleries/@moderator"}}},"ffmpegging":{"sha":"d8c707b543cea2a004cd4627c67bff804a313cab","lastUpdated":1700251735710,"version":"5.338.10-ffmpegging.rc","type":"production","bundles":{"nopus-opus":{"file":"c544a471.js","css":["assets/8effffb8.css"],"base":"ffmpegging/pp10-nopus-opus"}}}}}`),
        };
    },
    methods: {
        updateNewManifest(e: Event) {
            const { value } = e.target as HTMLInputElement;
            try {
                this.newManifest = JSON.parse(value);
            }
            catch (e) {
                this.newManifest = null;
            }
        },
    },
    computed: {
        mergedManifest() {
            if (this.newManifest) {
                const branches: Record<string, any> = {};
                Object.entries(this.newManifest.branches).forEach((entry: [
                    string,
                    any
                ]) => {
                    const [name, branch] = entry, oldBranch = this.manifest.branches[name];
                    const bundles: Record<string, any> = {};
                    Object.entries(branch.bundles).forEach((entry: [
                        string,
                        any
                    ]) => {
                        const [bundleName, bundle] = entry, oldBundle = oldBranch?.bundles[bundleName];
                        bundles[bundleName] = {
                            tag: oldBundle ? bundle.version !== oldBundle.version ? "updated" : "" : "new",
                            file: bundle.file,
                            css: bundle.css,
                            base: bundle.base,
                            version: bundle.version,
                            fromVersion: oldBundle?.version,
                        };
                    });
                    if (oldBranch)
                        Object.entries(oldBranch.bundles).forEach((entry: [
                            string,
                            any
                        ]) => {
                            const [bundleName, bundle] = entry;
                            if (!bundles[bundleName])
                                bundles[bundleName] = {
                                    tag: ["deleted"],
                                    file: bundle.file,
                                    css: bundle.css,
                                    base: bundle.base,
                                    version: bundle.version,
                                };
                        });
                    branches[name] = {
                        tag: oldBranch ? branch.version !== oldBranch.version ? "updated" : "" : "new",
                        sha: branch.sha,
                        lastUpdated: branch.lastUpdated,
                        version: branch.version,
                        fromVersion: oldBranch?.version,
                        type: branch.type,
                        bundles: bundles,
                    };
                });
                Object.entries(this.manifest.branches).forEach((entry: [
                    string,
                    any
                ]) => {
                    const [name, branch] = entry;
                    if (!branches[name])
                        branches[name] = {
                            tag: "deleted",
                            sha: branch.sha,
                            lastUpdated: branch.lastUpdated,
                            version: branch.version,
                            type: branch.type,
                            bundles: branch.bundles,
                        };
                });
                return {
                    environment: this.newManifest.environment,
                    version: this.newManifest.version,
                    loader: this.newManifest.loader,
                    branches: branches,
                };
            }
            return this.manifest;
        },
    },
    components: { ManifestBranch }
});
</script>

<template>
    <div class="main">
        <input type="text" @input="updateNewManifest" />
        <div class="branches">
            <ManifestBranch v-for="key in Object.keys(mergedManifest.branches)" :key="key" :name="key" :branch="mergedManifest.branches[key]" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    height: 100%;
}
</style>