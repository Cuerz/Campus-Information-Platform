import { login, logout, getInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import defAva from '@/assets/images/profile.jpg';

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    id: '',
    userName: '',
    avatar: '',
    role: '',
    nickName: '',
    phoneNumber: '',
    roleDescription: '',
    createTime: '',
    updateTime: '',
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        login(username, password)
          .then((res) => {
            // const data=res.data
            // setToken(data.tokenValue)
            // this.token = data.tokenValue
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
            this.id = profile.id
            this.role = profile.sysRole.roleName;
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
            this.token = '';
            this.role = '';
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
