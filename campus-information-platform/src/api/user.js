import request from "@/utils/request";
// 密码修改
export function updatePassword(oldPassword, newPassword, confirmPassword) {
  const data = {
    oldPassword,
    newPassword,
    confirmPassword,
  };
  return request({
    url: "/user/updatePassword",
    method: "post",
    data: data,
  });
}

// 修改用户
export function updateUser(data) {
  return request({
    url: "/user/update",
    method: "post",
    data: data,
  });
}
