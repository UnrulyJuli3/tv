<script lang="ts">
import { defineComponent } from "vue";
import AppModal from "./AppModal.vue";

export default defineComponent({
    data() {
        return {
            loadOptions: <any | null>null,
            loadPromise: <((result: any) => void) | undefined>undefined,
        };
    },
    methods: {
        promptLoad(options: any) {
            this.loadOptions = options;
            return new Promise(resolve => this.loadPromise = resolve);
        },
        onLoadResult(res: any) {
            if (this.loadPromise) {
                this.loadPromise(res);
                delete this.loadPromise;
                this.loadOptions = null;
            }
        },
    },
    mounted() {
        (window as any).tv.app = {
            prompt: (e: any) => this.promptLoad(e),
        };
    },
    components: { AppModal }
});
</script>

<template>
    <AppModal v-if="loadOptions" :options="loadOptions" @result="onLoadResult" />
</template>

<style scoped lang="scss"></style>