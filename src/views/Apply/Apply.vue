<template>
  <div class="apply-title">
    <el-button type="primary" @click="handleOpen">添加审批</el-button>
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

  <div class="apply-table">
    <el-table :data="pageApplyList" border style="width: 100%">
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

  <!-- 添加审批对话框 -->
  <el-dialog v-model="dialogVisible" title="添加审批" width="500px">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item label="审批人" prop="approvername">
        <el-select
          v-model="ruleForm.approvername"
          placeholder="请选择审批人"
          clearable
        >
          <el-option
            v-for="item in approver"
            :key="item._id as string"
            :label="item.name as string"
            :value="item.name as string"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审批事由" prop="reason">
        <el-select
          v-model="ruleForm.reason"
          placeholder="请选择审批事由"
          clearable
        >
          <el-option
            v-for="(item, index) in reasonOptions"
            :key="index"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="时间" prop="time">
        <el-date-picker
          v-model="ruleForm.time"
          type="datetimerange"
          start-placeholder="起始时间"
          end-placeholder="结束时间"
        />
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input
          v-model="ruleForm.note"
          :autosize="{ minRows: 4, maxRows: 6 }"
          type="textarea"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import moment from 'moment';
import { computed, ref, reactive } from 'vue';
import { useStore } from '@/store';
import { ElMessage } from 'element-plus';
import type { DateModelType, FormInstance, FormRules } from 'element-plus';

const defaultType = '全部';
const search = ref('');
const store = useStore();
const approverType = ref(defaultType);
const dialogVisible = ref(false);

const pageSize = ref(10);
const pageCurrent = ref(1);
const ruleFormRef = ref<FormInstance>();

interface ApplyList {
  applicantid: string;
  applicantname: string;
  approverid: string;
  approvername: string;
  note: string;
  reason: string;
  time: [DateModelType, DateModelType];
}

const reasonOptions = ['年假', '事假', '病假', '外出', '补签卡'];

const ruleForm = reactive<ApplyList>({
  applicantid: '',
  applicantname: '',
  reason: '',
  time: ['', ''],
  note: '',
  approverid: '',
  approvername: '',
});
const validatorTime = (
  rule: unknown,
  value: [DateModelType, DateModelType],
  callback: (arg?: Error) => void,
) => {
  if (!value[0] || !value[1]) {
    callback(new Error('请选择审批时间'));
  } else {
    callback();
  }
};
const rules = reactive<FormRules>({
  approvername: [{ required: true, message: '请选择审批人', trigger: 'blur' }],
  reason: [{ required: true, message: '请选择审批事由', trigger: 'blur' }],
  time: [{ validator: validatorTime, trigger: 'blur' }],
  note: [{ required: true, message: '请输入备注', trigger: 'blur' }],
});

const usersInfo = computed(() => store.state.users.infos);
const approver = computed(
  () => usersInfo.value.approver as { [index: string]: unknown }[],
);
const applyList = computed(() =>
  store.state.checks.applyList.filter(
    v =>
      (v.state === approverType.value || approverType.value === defaultType) &&
      (v.note as string).includes(search.value),
  ),
);
const pageApplyList = computed(() =>
  applyList.value.slice(
    (pageCurrent.value - 1) * pageSize.value,
    pageCurrent.value * pageSize.value,
  ),
);
const handleOpen = () => {
  dialogVisible.value = true;
};
const handleClose = () => {
  dialogVisible.value = false;
};

const pageChange = (value: number) => {
  pageCurrent.value = value;
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(valid => {
    if (valid) {
      ruleForm.applicantid = usersInfo.value._id as string;
      ruleForm.applicantname = usersInfo.value.name as string;
      ruleForm.approverid = (
        approver.value.find(v => v.name === ruleForm.approvername) as {
          [index: string]: unknown;
        }
      )._id as string;
      ruleForm.time[0] = moment(ruleForm.time[0]).format('YYYY-MM-DD HH:mm:ss');
      ruleForm.time[1] = moment(ruleForm.time[1]).format('YYYY-MM-DD HH:mm:ss');
      console.log(ruleForm);
      store.dispatch('checks/postApply', ruleForm).then(res => {
        if (res.data.errcode === 0) {
          store.dispatch('checks/getApply', { applicantid: usersInfo.value._id }).then(res => {
              if (res.data.errcode===0) {
                store.commit('checks/updateApplyList', res.data.rets);
              }
            })
          ElMessage.success('添加审批成功');
          resetForm(ruleFormRef.value);
          handleClose();
        }
      });
    } else {
      console.log('error submit!');
      return;
    }
  });
};
</script>

<style lang="scss" scoped>
.apply-title {
  margin: 20px;
  display: flex;
  justify-content: space-between;
}
.apply-table {
  margin: 10px;
  .el-pagination {
    float: right;
    margin: 10px;
  }
}
</style>
