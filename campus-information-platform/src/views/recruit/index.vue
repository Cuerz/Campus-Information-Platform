<template>
  <div>
    <section class="min-h-[80vh] px-[200px] py-10">
      <el-row>
        <el-col :span="17">
          <h3 class="font-sans font-bold text-[36px]">招聘中心</h3>
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
      <ul class="w-[50%] mx-auto mt-4">
        <li
          class="border-gray-200 border-b-[1px] py-2"
          v-for="(item, id) in recruitsList"
          :key="id"
        >
          <div class="flex justify-between">
            <h4 class="text-[20px] font-bold flex items-center">
              <el-icon size="100%"><Edit /></el-icon>
              <span>{{ item.jobName }}</span>
            </h4>
            <div>
              <h4 class="text-[16px] flex items-center">
                <el-icon><Timer /></el-icon>
                <el-tag type="success">{{ parseTime(item.createTime) }}</el-tag>
              </h4>
              <h4 class="text-[16px] flex items-center">
                <el-icon><Iphone /></el-icon>
                <el-tag type="error">{{ item.contactNumber }}</el-tag>
              </h4>
            </div>
          </div>
          <p class="">
            {{ item.jobDescription }}
          </p>
        </li>
      </ul>
    </section>

    <!-- 添加对话框 -->
    <el-dialog v-model="open" width="600px" append-to-body>
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

<script setup>
import { listRecruits, addRecruit } from "@/api/recruit";
import { Edit, Iphone, Timer } from "@element-plus/icons-vue";
import useUserStore from "@/store/modules/user";
import { ElMessage } from "element-plus";
const userStore = useUserStore();

const { proxy } = getCurrentInstance();

const recruitsList = ref([]);
const open = ref(false);

const data = reactive({
  user: {
    roleId: userStore.roleId,
  },
  form: {},
  rules: {
    jobName: [{ required: true, message: "职位名称不能为空", trigger: "blur" }],
    jobDescription: [
      { required: true, message: "详细信息不能为空", trigger: "blur" },
    ],
    contactNumber: [
      { required: true, message: "联系方式不能为空", trigger: "blur" },
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: "请输入正确的手机号码",
        trigger: "blur",
      },
    ],
  },
});

const { user, form, rules } = toRefs(data);

/** 查询列表 */
function getList() {
  listRecruits().then((res) => {
    recruitsList.value = res.data;
  });
}

/** 发布按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["recruitRef"].validate((valid) => {
    if (valid) {
      addRecruit(form.value).then((response) => {
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
    jobName: undefined,
    contactNumber: undefined,
    jobDescription: undefined,
  };
  proxy.resetForm("recruitRef");
}

getList();
</script>
