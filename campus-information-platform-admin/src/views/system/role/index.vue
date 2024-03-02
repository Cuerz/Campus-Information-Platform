<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="20" :xs="24" :offset="2">
        <el-form
          :model="queryParams"
          ref="queryRef"
          v-show="showSearch"
          :inline="true"
          label-width="68px"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input
              v-model="queryParams.roleName"
              placeholder="请输入角色名称"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input
              v-model="queryParams.description"
              placeholder="请输入描述"
              clearable
              style="width: 240px"
              @keyup.enter="handleQuery"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery"
              >搜索</el-button
            >
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <!-- 表格数据 -->
        <el-table
          v-loading="loading"
          :data="roleList"
          highlight-current-row
        >
          <el-table-column label="角色编号" prop="roleId" width="120" />
          <el-table-column
            label="角色名称"
            align="center"
            width="150"
          >
            <template #default="scope">
              <el-tag type="success">{{ scope.row.roleName }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column
            label="角色描述"
            align="center"
          >
            <template #default="scope">
              <el-tag type="danger">{{ scope.row.description }}</el-tag>
            </template>
          </el-table-column>

          <el-table-column label="状态" align="center" width="100">
            <template #default="scope">
              <el-switch v-model="scope.row.enable" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime">
            <template #default="scope">
              <span>{{ parseTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center" prop="updateTime">
            <template #default="scope">
              <span>{{ parseTime(scope.row.updateTime) }}</span>
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
  </div>
</template>

<script setup name="Role">
import { listRole } from '@/api/system/role';

const { proxy } = getCurrentInstance();

const roleList = ref([]);
const loading = ref(true);
const showSearch = ref(true);
const total = ref(0);
const dateRange = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    roleName: undefined,
    description: undefined,
  },
});

const { queryParams } = toRefs(data);

/** 查询角色列表 */
function getList() {
  loading.value = true;
  listRole(queryParams.value).then((res) => {
    roleList.value = res.data.list;
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
  dateRange.value = [];
  proxy.resetForm('queryRef');
  handleQuery();
}

getList();
</script>
