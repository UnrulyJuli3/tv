<script lang="ts">
import { defineComponent } from "vue";
import ManifestBundle from "./ManifestBundle.vue";

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        branch: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isExpanded: true,
        };
    },
    components: { ManifestBundle }
});
</script>

<template>
    <div class="branch">
        <div class="banner" @click="isExpanded = !isExpanded">
            <div class="name">{{ name }}</div>
            <div v-if="branch.tag" :class="`tag ${branch.tag}`">{{ branch.tag }}</div>
            <div class="version">{{ branch.fromVersion && branch.version !== branch.fromVersion ? `${branch.fromVersion} -> ${branch.version}` : branch.version }}</div>
        </div>
        <div class="bundles" v-if="isExpanded">
            <ManifestBundle v-for="key in Object.keys(branch.bundles)" :key="key" :name="key" :bundle="branch.bundles[key]" :branch="branch" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>