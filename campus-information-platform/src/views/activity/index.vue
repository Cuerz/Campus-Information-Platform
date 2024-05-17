<template>
  <div>
    <section class="min-h-[80vh] px-[200px] py-10">
      <el-row>
        <el-col :span="17">
          <h3 class="font-sans font-bold text-[36px]">活动区</h3>
        </el-col>
        <el-col :span="4">
          <el-button
            v-if="user.roleId <= 1"
            type="primary"
            plain
            @click="handleAdd"
            >我要发布</el-button
          >
        </el-col>
      </el-row>
      <ul class="w-[70%] mx-auto mt-4">
        <li
          class="border-gray-200 border-b-[1px] py-2"
          v-for="(item, id) in activitiesList"
          :key="id"
        >
          <div class="flex justify-between">
            <h4 class="text-[20px] font-bold flex items-center">
              <el-icon size="100%"><Edit /></el-icon>
              <span>{{ item.activityTitle }}</span>
            </h4>
            <div>
              <h4 class="text-[16px] flex items-center">
                <el-icon><Timer /></el-icon>
                <el-tag type="primary">{{ parseTime(item.createTime) }}</el-tag>
              </h4>
              <h4 class="text-[16px] flex items-center">
                <el-icon><MapLocation /></el-icon>
                <el-tag type="success">{{ item.activityLocale }}</el-tag>
              </h4>
            </div>
          </div>
          <el-tag type="warning">{{ item.activityLabel }}</el-tag>
          <p class="">
            {{ item.activityDescription }}
          </p>
        </li>
      </ul>
    </section>

    <!-- 添加活动对话框 -->
    <el-dialog v-model="open" width="600px" height="500px" append-to-body>
      <el-form
        :model="form"
        :rules="rules"
        ref="activityRef"
        label-width="80px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动名称" prop="activityTitle">
              <el-input
                v-model="form.activityTitle"
                placeholder="请输入活动名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="活动标签" prop="activityLabel">
              <el-select
                v-model="form.activityLabel"
                placeholder="请选择活动类型"
                clearable
                style="width: 240px"
              >
                <el-option label="体育" value="体育" />
                <el-option label="志愿者" value="志愿者" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="活动地点" prop="activityLocale">
              <el-input
                v-model="form.activityLocale"
                placeholder="请输入活动地点"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="详细信息" prop="activityDescription">
              <el-input
                v-model="form.activityDescription"
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

<script setup>
import { listActivities, addActivity } from "@/api/activity";
import { Edit, MapLocation, Timer } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
const userStore = useUserStore();

const { proxy } = getCurrentInstance();

const activitiesList = ref([]);
const open = ref(false);

const data = reactive({
  user: {
    roleId: userStore.roleId,
  },
  form: {},
  rules: {
    activityTitle: [
      { required: true, message: "活动名称不能为空", trigger: "blur" },
    ],
    activityDescription: [
      { required: true, message: "活动名称详细信息不能为空", trigger: "blur" },
    ],
    activityLabel: [
      { required: true, message: "活动类型不能为空", trigger: "blur" },
    ],
    activityLocale: [
      { required: true, message: "活动地点不能为空", trigger: "blur" },
    ],
  },
});

const { user, form, rules } = toRefs(data);

/** 查询列表 */
function getList() {
  listActivities().then((res) => {
    activitiesList.value = res.data;
  });
}

/** 发布按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["activityRef"].validate((valid) => {
    if (valid) {
      addActivity(form.value).then((response) => {
        ElMessage.success("提交成功，请等待管理员审核");
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

/** 重置操作表单 */
function reset() {
  form.value = {
    activityTitle: undefined,
    activityDescription: undefined,
    activityLabel: undefined,
    activityLocale: undefined,
  };
  proxy.resetForm("activityRef");
}

getList();
</script>

