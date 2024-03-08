<template>
  <div>
    <div class="bg-gray-800 w-full h-[7vh]">
      <div class="relative">
        <div class="py-[5px] px-0 flex mx-auto w-[80%] justify-between">
          <div>
            <span class="text-white text-[35px]">NUIST</span>
            <span class="text-gray-400 text-[12px] relative top-2"
              >信息公开平台</span
            >
          </div>
          <div>
            <ul class="w-auto m-0 flex h-[100%]">
              <router-link
                to="/"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >首页</a
                  >
                </li>
              </router-link>
              <router-link
                to="/lost"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >失物认领</a
                  >
                </li>
              </router-link>
              <router-link
                to="/activity"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >活动</a
                  >
                </li>
              </router-link>
              <router-link
                to="/recruit"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >招聘信息</a
                  >
                </li>
              </router-link>
              <router-link
                to="/old"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >二手信息</a
                  >
                </li>
              </router-link>
              <router-link
                to="/announcement"
                exact-active-class="text-white"
                v-slot="{ navigate }"
              >
                <li @click="navigate" class="px-[14px] py-4">
                  <a
                    class="font-sans font-light text-sm text-gray-400 hover:text-white"
                    >文章/公告</a
                  >
                </li>
              </router-link>
              <li v-if="state.user.avatar == ''" class="px-[14px] py-4">
                <el-button type="primary" link @click="goLogin"
                  >登录/注册</el-button
                >
              </li>

              <div v-else class="avatar-container">
                <el-dropdown
                  @command="handleCommand"
                  class="right-menu-item hover-effect"
                  trigger="click"
                >
                  <div class="ml-[5px] mt-[6px] relative">
                    <img
                      :src="userStore.avatar"
                      class="w-[40px] height-[40px] rounded-[25px]"
                    />
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <router-link to="/user">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                      </router-link>
                      <el-dropdown-item divided command="logout">
                        <span>退出登录</span>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from "element-plus";
import useUserStore from "@/store/modules/user";
const router = useRouter();
const userStore = useUserStore();

const state = reactive({
  user: {
    avatar: userStore.avatar,
  },
});

function goLogin() {
  router.push({ path: "/login" });
}

function handleCommand(command) {
  switch (command) {
    case "logout":
      logout();
      break;
    default:
      break;
  }
}

function logout() {
  ElMessageBox.confirm("确定注销并退出系统吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      userStore.logOut().then(() => {
        location.href = "/";
      });
    })
    .catch(() => {});
}
</script>
