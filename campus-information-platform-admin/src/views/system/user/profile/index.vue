<template>
  <div class="app-container">
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
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户名称
                <div class="pull-right">{{ state.user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="user" />用户昵称
                <div class="pull-right">{{ state.user.nickName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="phone" />手机号码
                <div class="pull-right">{{ state.user.phoneNumber }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" />所属角色
                <div class="pull-right">{{ state.user.roleDescription }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />创建日期
                <div class="pull-right">
                  {{ parseTime(state.user.createTime) }}
                </div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" />更新日期
                <div class="pull-right">
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

<script setup name="Profile">
import userAvatar from './userAvatar';
import userInfo from './userInfo';
import resetPwd from './resetPwd';
import { getInfo } from '@/api/login';
import useUserStore from '@/store/modules/user';

const userStore = useUserStore();

const activeTab = ref('userinfo');
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

// function getUser() {
//    getInfo().then(response => {
//     state.user = response.data;
//     console.log(response.data);
//     console.log(response.data.sysRole.description);
//   });
// };

// getUser();
</script>
