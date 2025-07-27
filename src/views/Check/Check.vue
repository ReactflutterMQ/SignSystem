<template>
  <div class="check-title">
    <el-space>
      <el-input v-model="search" clearable placeholder="请输入搜索关键词" />
      <el-button type="primary" icon="Search">搜索</el-button>
      <el-divider direction="vertical"></el-divider>
      <el-radio-group v-model="approverType">
        <el-radio-button label="全部"></el-radio-button>
        <el-radio-button label="待审批"></el-radio-button>
        <el-radio-button label="已通过"></el-radio-button>
        <el-radio-button label="未通过"></el-radio-button>
      </el-radio-group>
    </el-space>
  </div>

  <div class="check-table">
    <el-table :data="checkList" border>
      <el-table-column prop="applicantname" label="申请人" width="180" />
      <el-table-column prop="reason" label="审批事由" width="180" />
      <el-table-column prop="time" label="时间">
        <template #default="scope">
          {{ scope.row.time.join(' - ') }}
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" />
      <el-table-column prop="approvername" label="审批人" width="180" />
      <el-table-column prop="state" label="状态" width="180" />
    </el-table>
    <el-pagination
      size="small"
      background
      layout="prev, pager, next"
      @current-change="pageChange"
      :total="applyList.length"
      :page-size="10"
      :page-sizes="[10, 20, 30, 40]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from '@/store';

const defaultType = '全部';
const search = ref('');
const store = useStore();
const approverType = ref(defaultType);

const pageSize = ref(10);
const pageCurrent = ref(1);

const checkList = computed(() => store.state.checks.checkList);
const applyList = computed(() =>
  store.state.checks.applyList.filter(
    v =>
      (v.state === approverType.value || approverType.value === defaultType) &&
      (v.note as string).includes(search.value),
  ),
);

const pageChange = (value: number) => {
  pageCurrent.value = value;
};
</script>

<style lang="scss" scoped>
.check-title {
  margin: 20px;
  display: flex;
  justify-content: flex-end;
}
.check-table {
  margin: 10px;
  .el-pagination {
    float: right;
    margin: 10px;
  }
}
</style>
