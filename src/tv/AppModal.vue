<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    props: {
        options: {
            type: Object,
            required: true,
        },
    },
    data(vm) {
        return {
            branch: vm.options.branch,
            count: 0,
            hasCount: true,
            countTimeout: <number | undefined>undefined,
        };
    },
    watch: {
        branch: "endCount",
    },
    methods: {
        submit() {
            this.stopCount();
            this.$emit("result", {
                branch: this.branch,
            });
        },
        stopCount() {
            window.clearTimeout(this.countTimeout);
        },
        endCount() {
            this.stopCount();
            this.hasCount = false;
        },
        resetCount() {
            if (!this.hasCount) return;
            this.stopCount();
            this.count = 4;
            this.nextCount();
        },
        nextCount() {
            this.count--;
            if (this.count <= 0) {
                this.submit();
                return;
            }
            this.countTimeout = window.setTimeout(this.nextCount, 1000);
        },
    },
    mounted() {
        (window.document.activeElement as any)?.blur?.();
        this.resetCount();
    },
    emits: ["result"],
});
</script>

<template>
    <div class="app-modal">
        <div class="am-constrain">
            <div class="am-container">
                <div class="am-app">{{ options.app }}</div>
                <select class="am-branches" v-model="branch" @focus="endCount">
                    <option v-for="branch in options.branches" :value="branch.branch">{{ branch.branch }} ({{ branch.version }})</option>
                </select>
                <button class="am-submit" @click="submit">{{ hasCount ? `Load (${count})` : "Load" }}</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.app-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2e4;
    background: #000c;
    overflow: auto;
}

.am-constrain {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100%;
}

.am-container {
    position: relative;
    width: 100%;
    min-width: 320px;
    max-width: 450px;
    padding: 40px;
    display: flex;
    flex-direction: column;
}

* {
    font-family: Helvetica, Arial, sans-serif;
    box-sizing: border-box;
}

.am-app {
    position: relative;
    width: 100%;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    text-align: center;
}

.am-branches {
    width: 100%;
    margin: 10px 0 20px;
    padding: 6px;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
}

.am-submit {
    width: 100%;
    cursor: pointer;
    border: none;
    padding: 10px 20px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 700;
    font-family: Helvetica, Arial, sans-serif;
    background: #4254f4;
    color: #f5f7f7;
    text-transform: uppercase;
    box-shadow: 0 5px 0 0 rgb(4, 9, 14, .5);
}
</style>