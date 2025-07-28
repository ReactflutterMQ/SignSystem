<template>
  <div class="home-header">
    <span class="home-header-logo">
      <i class="iconfont icon-vue"></i>
      <i class="iconfont icon-icon-test"></i>
      <i class="iconfont icon-typescript"></i>
    </span>
    <span class="home-header-title">在线考勤系统</span>
    <el-dropdown>
      <el-badge class="home-header-badge" :is-dot="isDot">
        <el-icon><Bell :size="20" /></el-icon>
      </el-badge>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if="newsInfos.applicant" @click="handleNavigate('/apply')">
            有审批结果消息
          </el-dropdown-item>
          <el-dropdown-item v-if="newsInfos.approver" @click="handleNavigate('/check')">
            有审批请求消息
          </el-dropdown-item>
          <el-dropdown-item v-if="!newsInfos.applicant && !newsInfos.approver">
            暂无消息
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-dropdown>
      <el-space class="home-header-space">
        <el-avatar :src="head as string" />
        {{ name }}
      </el-space>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="dialogVisible = true">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

  <el-dialog v-model="dialogVisible" title="提示" width="500">
    <span>确认退出系统吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="logOut">确认</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const dialogVisible = ref(false);

// 用计算属性是响应式
const head = computed(() => store.state.users.infos.head);
const name = computed(() => store.state.users.infos.name);
const newsInfos = computed(() => store.state.news.info);
const isDot = computed(
  () => (newsInfos.value.applicant || newsInfos.value.approver) as boolean,
);

const handleNavigate = (path: string) => {
  router.push(path);
}

const logOut = () => {
  dialogVisible.value = false;
  ElMessage.success('退出成功');
  setTimeout(() => {
    window.location.replace('/login');
    store.commit('users/clearToken');
  }, 1000);
};
</script>

<style lang="scss" scoped>
.home-header {
  display: flex;
  font-size: 34px;
  align-items: center;
  height: 100%;
  &-logo {
    .icon-vue,
    .icon-icon-test,
    .icon-typescript {
      margin-right: 5px;
      font-size: inherit;
    }
    .icon-vue {
      color: #008000;
    }
    .icon-icon-test {
      color: #deb887;
    }
    .icon-typescript {
      color: #0000ff;
    }
  }
  &-title {
    margin-left: 30px;
    font-weight: 700;
    font-size: 18px;
    margin-right: auto;
  }
  &-space {
    margin-left: 20px;
  }
}
</style>
