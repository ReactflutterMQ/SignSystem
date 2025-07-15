<template>
    <el-container>
        <el-header>
            <!-- 头部 -->
            <home-header></home-header>
        </el-header>
        <el-container>
            <el-aside>
                <!-- 侧边栏 -->
                <home-aside></home-aside>
            </el-aside>
            <el-main>
                <!-- 面包屑 -->
                <home-breadcrumb></home-breadcrumb>
                <!-- 内容区 -->
                <home-main></home-main>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import HomeHeader from './components/HomeHeader.vue'
import HomeAside from './components/HomeAside.vue'
import HomeBreadcrumb from './components/Breadcrumb.vue'
import HomeMain from './components/HomeMain.vue'
</script>

<style lang="scss" scoped>
.el-header {
    box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
}
.el-aside {
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
}
.el-main {
    background: #f0f2f5;
    display: flex;
    flex-direction: column;
}
</style>