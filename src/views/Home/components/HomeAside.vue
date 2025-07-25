<template>
  <el-menu :default-active="route.path" class="el-menu-vertical-demo" router>
    <el-sub-menu v-for="menu in menus" :key="menu.path" :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.meta?.icon"></component>
        </el-icon>
        <span>{{ menu.meta?.title }}</span>
      </template>
      <el-menu-item
        v-for="menuChild in menu.children"
        :key="menuChild.path"
        :index="menu.path + menuChild.path"
      >
        <el-icon>
          <component :is="menuChild.meta?.icon"></component>
        </el-icon>
        <span>{{ menuChild.meta?.title }}</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useStore } from '@/store';
import { useRoute, useRouter } from 'vue-router';
import type { RouteRecordName } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();
const permission = store.state.users.infos.permission;

const menus = _.cloneDeep(router.options.routes).filter(v => {
  v.children = v.children?.filter(
    v =>
      v.meta?.menu &&
      (permission as (RouteRecordName | undefined)[]).includes(v.name),
  );
  return (
    v.meta?.menu &&
    (permission as (RouteRecordName | undefined)[]).includes(v.name)
  );
});
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
