<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        bundle: {
            type: Object,
            required: true,
        },
        branch: {
            type: Object,
            required: true,
        },
    },
});
</script>

<template>
    <div class="bundle">
        <div class="name">{{ name }}</div>
        <div v-if="bundle.tag" :class="`tag ${bundle.tag}`">{{ bundle.tag }}</div>
        <div class="version">{{ bundle.fromVersion && bundle.version !== bundle.fromVersion ? `${bundle.fromVersion} -> ${bundle.version}` : bundle.version ?? branch.version }}</div>
    </div>
</template>

<style scoped lang="scss"></style>