import request from '@/utils/request';
import { parseStrEmpty } from '@/utils/ruoyi';

// 查询用户列表
export function listUser(query) {
  return request({
    url: '/admin/user/list',
    method: 'get',
    params: query,
  });
}

// 查询用户信息
export function getUser(id) {
  const data = {
    id
  };
  return request({
    url: '/admin/user/getUser',
    method: 'get',
    params: data,
  });
}

// 新增用户
export function addUser(data) {
  return request({
    url: '/admin/user/add',
    method: 'post',
    data: data,
  });
}

// 修改用户
export function updateUser(data) {
  return request({
    url: '/admin/user/update',
    method: 'post',
    data: data,
  });
}

// 用户启用状态修改
export function changeUserEnable(id, enable) {
  const data = {
    id,
    enable,
  };
  return request({
    url: '/admin/user/updateEnable',
    method: 'post',
    data: data,
  });
}

// 用户密码重置初始密码
export function resetUserPwd(id) {
  const data = {
    id
  };
  return request({
    url: '/admin/user/resetPassword',
    method: 'post',
    data: data,
  });
}

// 删除用户
export function delUser(id) {
  return request({
    url: '/admin/user/delete/' + id,
    method: 'delete',
  });
}

// 密码修改
export function updatePassword(oldPassword, newPassword,confirmPassword) {
  const data = {
    oldPassword,
    newPassword,
    confirmPassword
  };
  return request({
    url: '/admin/user/updatePassword',
    method: 'post',
    data: data,
  });
}








// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: '/system/user/profile/avatar',
    method: 'post',
    data: data,
  });
}

// 查询授权角色
export function getAuthRole(userId) {
  return request({
    url: '/system/user/authRole/' + userId,
    method: 'get',
  });
}

// 保存授权角色
export function updateAuthRole(data) {
  return request({
    url: '/system/user/authRole',
    method: 'put',
    params: data,
  });
}
