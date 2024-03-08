<template>
  <div class="app-container">
    <el-row :gutter="20">
      <!--物品数据-->
      <el-col :span="20" :xs="24" :offset="2">
        <el-form
          :model="queryParams"
          ref="queryRef"
          :inline="true"
          v-show="showSearch"
          label-width="68px"
        >
          <el-form-item label="职位名称" prop="jobName">
            <el-input
              v-model="queryParams.jobName"
              placeholder="请输入职位名称"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="审核状态" prop="examine">
            <el-select
              v-model="queryParams.examine"
              placeholder="是否审核"
              clearable
              style="width: 240px"
            >
              <el-option label="已审核" value="true" />
              <el-option label="未审核" value="false" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd"
              >新增</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button
              type="danger"
              plain
              icon="Delete"
              :disabled="single"
              @click="handleDelete"
              >删除</el-button
            >
          </el-col>
          <right-toolbar
            v-model:showSearch="showSearch"
            @queryTable="getList"
            :columns="columns"
          ></right-toolbar>
        </el-row>

        <el-table
          v-loading="loading"
          :data="recruitList"
          border
          fit
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column
            label="编号"
            align="center"
            key="recruitId"
            prop="recruitId"
            v-if="columns[0].visible"
          />
          <el-table-column
            label="发布者昵称"
            align="center"
            key="nickName"
            prop="nickName"
            v-if="columns[1].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="职位名称"
            align="center"
            key="jobName"
            prop="jobName"
            v-if="columns[2].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="详细描述"
            key="jobDescription"
            prop="jobDescription"
            v-if="columns[3].visible"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="联系方式"
            align="center"
            key="contactNumber"
            prop="contactNumber"
            v-if="columns[4].visible"
            width="120"
          />
          <el-table-column
            label="审核状态"
            align="center"
            v-if="columns[5].visible"
          >
            <template #default="scope">
              <el-switch
                v-model="scope.row.examine"
                @change="handleExamineChange(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="center"
            prop="createTime"
            v-if="columns[6].visible"
            width="160"
          >
            <template #default="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="更新时间"
            align="center"
            prop="updateTime"
            v-if="columns[7].visible"
            width="160"
          >
            <template #default="scope">
              <span>{{ parseTime(scope.row.updateTime) }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            width="150"
            class-name="small-padding fixed-width"
          >
            <template #default="scope">
              <el-tooltip content="删除" placement="top">
                <el-button
                  link
                  type="primary"
                  icon="Delete"
                  @click="handleDelete(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total > 0"
          :total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="getList"
        />
      </el-col>
    </el-row>

    <!-- 添加对话框 -->
    <el-dialog :title="title" v-model="open" width="600px" append-to-body>
      <el-form :model="form" :rules="rules" ref="recruitRef" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="职位名称" prop="jobName">
              <el-input
                v-model="form.jobName"
                placeholder="请输入职位名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式" prop="contactNumber">
              <el-input
                v-model="form.contactNumber"
                placeholder="请输入手机号码"
                maxlength="11"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细信息" prop="jobDescription">
              <el-input
                v-model="form.jobDescription"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Recruit">
import {
  listRecruit,
  delRecruit,
  changeRecruitExamine,
  addRecruit,
} from '@/api/core/recruit';
const { proxy } = getCurrentInstance();

const recruitList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const single = ref(true);
const total = ref(0);
const title = ref('');
const idSelect = ref([]);

// 列显隐信息
const columns = ref([
  { key: 0, label: `编号`, visible: true },
  { key: 1, label: `发布者昵称`, visible: true },
  { key: 2, label: `职位名称`, visible: true },
  { key: 3, label: `详细描述`, visible: true },
  { key: 4, label: `联系方式`, visible: true },
  { key: 5, label: `审核状态`, visible: true },
  { key: 6, label: `创建时间`, visible: true },
  { key: 7, label: `更新时间`, visible: true },
]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    jobName: undefined,
    examine: undefined,
  },
  rules: {
    jobName: [{ required: true, message: '职位名称不能为空', trigger: 'blur' }],
    jobDescription: [
      { required: true, message: '详细信息不能为空', trigger: 'blur' },
    ],
    contactNumber: [
      { required: true, message: '联系方式不能为空', trigger: 'blur' },
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur',
      },
    ],
  },
});

const { queryParams, form, rules } = toRefs(data);

/** 选择条数  */
function handleSelectionChange(selection) {
  single.value = selection.length != 1;
  idSelect.value = selection.map((item) => item.recruitId);
}

/** 查询失物列表 */
function getList() {
  loading.value = true;
  listRecruit(queryParams.value).then((res) => {
    recruitList.value = res.data.list;
    total.value = res.data.total;
    loading.value = false;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}
/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm('queryRef');
  handleQuery();
}

/** 重置操作表单 */
function reset() {
  form.value = {
    jobName: undefined,
    contactNumber: undefined,
    jobDescription: undefined,
  };
  proxy.resetForm('recruitRef');
}

/** 审核状态修改  */
function handleExamineChange(row) {
  let text = row.examine === true ? '通过' : '不通过';
  proxy.$modal
    .confirm(
      '确认审核"' + text + '"' + '编号为"' + row.recruitId + '"的记录吗?'
    )
    .then(function () {
      return changeRecruitExamine(row.recruitId, row.examine);
    })
    .then(() => {
      proxy.$modal.msgSuccess(text + '成功');
    })
    .catch(function () {
      row.examine = row.examine === true ? false : true;
    });
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
}

/** 删除按钮操作 */
function handleDelete(row) {
  const recruitId = row.recruitId || idSelect.value[0];
  proxy.$modal
    .confirm('是否确认删除编号为"' + recruitId + '"的记录？')
    .then(function () {
      return delRecruit(recruitId);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess('删除成功');
    })
    .catch(() => {});
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs['recruitRef'].validate((valid) => {
    if (valid) {
      addRecruit(form.value).then((response) => {
        proxy.$modal.msgSuccess('新增成功');
        open.value = false;
        getList();
      });
    }
  });
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

getList();
</script>

<style>
.img-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.img-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<style scoped>
.img-uploader .img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
