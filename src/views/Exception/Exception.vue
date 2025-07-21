<template>
  <div class="exception-title">
    <el-button type="primary">异常处理</el-button>
    <el-space>
      <el-button plain>{{ year }}年</el-button>
      <el-select v-model="month" placeholder="请选择">
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item + '月'"
          :value="item"
        />
      </el-select>
    </el-space>
  </div>
  <el-row :gutter="20">
    <el-col :span="12">
      <el-empty v-if="false" description="description" />
      <el-timeline v-else>
        <el-timeline-item timestamp="2023-01-01" placement="top">
          <el-card>
            <el-space>
              <h4>旷工</h4>
              <p>考勤详情：暂无打卡记录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023-01-01" placement="top">
          <el-card>
            <el-space>
              <h4>旷工</h4>
              <p>考勤详情：暂无打卡记录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023-01-01" placement="top">
          <el-card>
            <el-space>
              <h4>旷工</h4>
              <p>考勤详情：暂无打卡记录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023-01-01" placement="top">
          <el-card>
            <el-space>
              <h4>旷工</h4>
              <p>考勤详情：暂无打卡记录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023-01-01" placement="top">
          <el-card>
            <el-space>
              <h4>旷工</h4>
              <p>考勤详情：暂无打卡记录</p>
            </el-space>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="12">
      <el-empty v-if="false" description="description" />
      <el-timeline v-else>
        <el-timeline-item timestamp="2023-01-01" placement="top">
          <el-card>
            <h4>待审批</h4>
            <p class="exception-info">申请日期 2025-07-18 12:00:00 - 2025-08-28 12:00:00</p>
            <p class="exception-info">申请详情 3fsdf</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023-01-01" placement="top">
          <el-card>
            <h4>待审批</h4>
            <p class="exception-info">申请日期 2025-07-18 12:00:00 - 2025-08-28 12:00:00</p>
            <p class="exception-info">申请详情 3fsdf</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023-01-01" placement="top">
          <el-card>
            <h4>待审批</h4>
            <p class="exception-info">申请日期 2025-07-18 12:00:00 - 2025-08-28 12:00:00</p>
            <p class="exception-info">申请详情 3fsdf</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2023-01-01" placement="top">
          <el-card>
            <h4>待审批</h4>
            <p class="exception-info">申请日期 2025-07-18 12:00:00 - 2025-08-28 12:00:00</p>
            <p class="exception-info">申请详情 3fsdf</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const date = new Date();
const year = date.getFullYear();
const month = ref(date.getMonth() + 1);
</script>

<style lang="scss" scoped>
.exception-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.el-select {
  width: 80px;
}
.el-timeline {
    margin: 10px;
}
.exception-info {
    margin: 10px;
}
</style>
