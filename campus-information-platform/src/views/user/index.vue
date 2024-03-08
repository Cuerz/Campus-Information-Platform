<template>
  <div class="p-5 h-[75vh]">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>个人信息</span>
            </div>
          </template>
          <div>
            <div class="text-center">
              <userAvatar />
            </div>
            <ul class="list-group list-group-striped">
              <li class="border-y-[1px] border-solid text-[13px] p-[11px]">
                用户名称
                <div class="float-right">{{ state.user.userName }}</div>
              </li>
              <li class="border-y-[1px] border-solid text-[13px] p-[11px]">
                用户昵称
                <div class="float-right">{{ state.user.nickName }}</div>
              </li>
              <li class="border-y-[1px] border-solid text-[13px] p-[11px]">
                手机号码
                <div class="float-right">{{ state.user.phoneNumber }}</div>
              </li>
              <li class="border-y-[1px] border-solid text-[13px] p-[11px]">
                所属角色
                <div class="float-right">{{ state.user.roleDescription }}</div>
              </li>
              <li class="border-y-[1px] border-solid text-[13px] p-[11px]">
                创建日期
                <div class="float-right">
                  {{ parseTime(state.user.createTime) }}
                </div>
              </li>
              <li class="border-y-[1px] border-solid text-[13px] p-[11px]">
                更新日期
                <div class="float-right">
                  {{ parseTime(state.user.updateTime) }}
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <template v-slot:header>
            <div class="clearfix">
              <span>基本资料</span>
            </div>
          </template>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="state.user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import userAvatar from "./userAvatar.vue";
import userInfo from "./userInfo.vue";
import resetPwd from "./resetPwd.vue";
import useUserStore from "@/store/modules/user";

const userStore = useUserStore();

const activeTab = ref("userinfo");
const state = reactive({
  user: {
    id: userStore.id,
    userName: userStore.userName,
    nickName: userStore.nickName,
    phoneNumber: userStore.phoneNumber,
    roleDescription: userStore.roleDescription,
    createTime: userStore.createTime,
    updateTime: userStore.updateTime,
  },
});
</script>
