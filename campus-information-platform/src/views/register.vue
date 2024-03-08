<template>
  <div class="register-container">
    <el-form
      ref="registerRef"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">系统注册</h3>
      </div>

      <el-form-item prop="userName">
        <el-input
          ref="userName"
          v-model="registerForm.userName"
          placeholder="userName"
          name="userName"
          type="text"
          tabindex="1"
          auto-complete="false"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          show-password
          ref="password"
          v-model="registerForm.password"
          type="password"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="false"
          @keyup.enter="handleRegister"
        />
      </el-form-item>

      <el-form-item prop="nickName">
        <el-input
          ref="nickName"
          v-model="registerForm.nickName"
          placeholder="nickName"
          name="nickName"
          type="text"
          tabindex="1"
          auto-complete="false"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        size="large"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.prevent="handleRegister"
      >
        <span v-if="!loading">注册</span>
        <span v-else>注 册 中...</span>
      </el-button>

      <div class="tips">
        <el-button
          style="margin-right: 20px"
          type="primary"
          link
          @click="goLogin"
          >已有账号，立即登录</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
const loading = ref(false);
const { proxy } = getCurrentInstance();
const router = useRouter();
const userStore = useUserStore();

const registerForm = ref({
  userName: "",
  password: "",
  nickName: "",
});

const registerRules = {
  userName: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
  password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
  nickName: [{ required: true, trigger: "blur", message: "请输入您的昵称" }],
};

function handleRegister() {
  proxy.$refs.registerRef.validate((valid) => {
    if (valid) {
      loading.value = true;
      // 调用action的登录方法
      userStore
        .register(registerForm.value)
        .then(() => {
          ElMessage.success("注册成功");
        })
        .catch(() => {
          loading.value = false;
        });
    }
  });
}

function goLogin() {
  router.push({ path: "/login" });
}
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;

    .el-input__wrapper {
      width: 100%;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      box-shadow: none;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.register-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
