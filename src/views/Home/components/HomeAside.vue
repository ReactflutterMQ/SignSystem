<template>
    <el-menu default-active="1-1" class="el-menu-vertical-demo">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item index="1-1">
                <el-icon><location /></el-icon>
                <span>item one</span>
            </el-menu-item>
            <el-menu-item index="1-2">
                <el-icon><location /></el-icon>
                <span>item one</span>
            </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>Navigator One</span>
            </template>
            <el-menu-item index="2-1">
                <el-icon><location /></el-icon>
                <span>item one</span>
            </el-menu-item>
            <el-menu-item index="2-2">
                <el-icon><location /></el-icon>
                <span>item one</span>
            </el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
console.log('router', router);

</script>

<style lang="scss" scoped>
.el-menu {
    height: calc(100vh - 60px);
    padding-top: 30px;
    border: none;
}
.el-menu-item.is-active {
    background: #e6f7ff;
    border-right: 3px solid #1890ff;
}
</style>