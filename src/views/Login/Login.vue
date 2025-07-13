<template>
    <div>
        hello login
    </div>
</template>

<script setup lang="ts">
// import http from '@/utils/http';
// http.post('/users/login', {
//     "email": "huangrong@imooc.com",
//     "pass": "huangrong"
// }).then(res => {
//     console.log('res', res);
// })

import { useStore } from '@/store';
const store = useStore();
store.dispatch('users/login').then(res => {
    console.log('res', res);
})

</script>

<style lang="scss" scoped>

</style>