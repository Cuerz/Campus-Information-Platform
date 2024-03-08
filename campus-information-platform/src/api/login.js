import request from "@/utils/request";

// 登录方法
export function login(userName, password) {
  const data = {
    userName,
    password,
  };
  return request({
    url: "/login",
    method: "post",
    data: data,
  });
}

// 注册方法
export function register(userName, password, nickName) {
  const data = {
    userName,
    password,
    nickName,
  };
  return request({
    url: "/register",
    method: "post",
    data: data,
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: "/loginInfo",
    method: "get",
  });
}

// 退出方法
export function logout() {
  return request({
    url: "/logout",
    method: "get",
  });
}
