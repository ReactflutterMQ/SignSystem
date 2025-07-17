<template>
    <div class="home-header">
        <span class="home-header-logo">
            <i class="iconfont icon-vue"></i>
            <i class="iconfont icon-icon-test"></i>
            <i class="iconfont icon-typescript"></i>
        </span>
        <span class="home-header-title">在线考勤系统</span>
        <el-dropdown>
            <el-badge class="home-header-badge">
                <el-icon><Bell :size="20" /></el-icon>
            </el-badge>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>暂无消息</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-dropdown>
            <el-space class="home-header-space">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />黄蓉
            </el-space>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item @click="dialogVisible = true">退出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>

    <el-dialog
        v-model="dialogVisible"
        title="提示"
        width="500"
    >
        <span>确认退出系统吗？</span>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="logOut">
            确认
            </el-button>
        </div>
        </template>
    </el-dialog>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '@/store'

const store = useStore()
const router = useRouter()
const dialogVisible = ref(false)

const logOut = () => {
    dialogVisible.value = false
    ElMessage.success('退出成功')
    setTimeout(() => {
        router.push('/login')
        store.commit('clearToken', 'clearInfos')
    }, 1000);
}
</script>

<style lang="scss" scoped>
.home-header {
    display: flex;
    font-size: 34px;
    align-items: center;
    height: 100%;
    &-logo {
        .icon-vue, .icon-icon-test, .icon-typescript {
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