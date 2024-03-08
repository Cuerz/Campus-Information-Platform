import { login, register, logout, getInfo } from "@/api/login";
import { getToken, removeToken } from "@/utils/auth";
import defAva from "@/assets/images/avatar.jpg";

const useUserStore = defineStore("user", {
  state: () => ({
    token: getToken(),
    id: "",
    userName: "",
    avatar: "",
    role: "",
    roleId: "",
    nickName: "",
    phoneNumber: "",
    roleDescription: "",
    createTime: "",
    updateTime: "",
  }),
  actions: {
    // 注册
    register(userInfo) {
      const userName = userInfo.userName;
      const password = userInfo.password;
      const nickName = userInfo.nickName;
      return new Promise((resolve, reject) => {
        register(userName, password, nickName)
          .then((res) => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 登录
    login(userInfo) {
      const userName = userInfo.userName;
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(userName, password)
          .then((res) => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const profile = res.data;
            this.id = profile.id;
            this.role = profile.sysRole.roleName;
            this.roleId = profile.sysRole.roleId;
            this.roleDescription = profile.sysRole.description;
            this.userName = profile.userName;
            this.nickName = profile.nickName;
            this.phoneNumber = profile.phoneNumber;
            this.createTime = profile.createTime;
            this.updateTime = profile.updateTime;
            this.avatar = defAva;
            this.token = getToken();
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = "";
            this.role = "";
            this.userName = "";
            this.nickName = "";
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

export default useUserStore;
