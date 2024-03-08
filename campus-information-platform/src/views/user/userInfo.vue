<template>
  <el-form ref="userRef" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="用户昵称" prop="nickName">
      <el-input v-model="form.nickName" maxlength="30" />
    </el-form-item>
    <el-form-item label="手机号码" prop="phoneNumber">
      <el-input v-model="form.phoneNumber" maxlength="11" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">保存</el-button>
      <el-button type="danger">关闭</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { updateUser } from "@/api/user";

const props = defineProps({
  user: {
    type: Object,
  },
});

const { proxy } = getCurrentInstance();

const form = ref({});
const rules = ref({
  nickName: [{ required: true, message: "用户昵称不能为空", trigger: "blur" }],
  phoneNumber: [
    { required: true, message: "手机号码不能为空", trigger: "blur" },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: "请输入正确的手机号码",
      trigger: "blur",
    },
  ],
});

/** 提交按钮 */
function submit() {
  proxy.$refs.userRef.validate((valid) => {
    if (valid) {
      updateUser(form.value).then((response) => {
        ElMessage.success("修改成功");
        props.user.phoneNumber = form.value.phoneNumber;
        props.user.nickName = form.value.nickName;
      });
    }
  });
}

// 回显当前登录用户信息
watch(
  () => props.user,
  (user) => {
    if (user) {
      form.value = {
        id: user.id,
        nickName: user.nickName,
        phoneNumber: user.phoneNumber,
      };
    }
  },
  { immediate: true }
);
</script>
