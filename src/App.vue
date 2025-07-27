<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
const debounce = (fn: any, delay: number) => {
    let timer: number | undefined;
    return (...args: any[]) => {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn(...args)
        }, delay)
    }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback: (arg1: any, arg2: any) => void) {
        callback = debounce(callback, 200);
        super(callback);
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/reset.scss';
@import '@/assets/styles/iconfont.scss';
@import '@/assets/styles/common.scss';
</style>
