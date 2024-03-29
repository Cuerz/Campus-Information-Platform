import axios from 'axios';
import {
	ElNotification,
	ElMessageBox,
	ElMessage,
} from 'element-plus';
import { getToken } from '@/utils/auth';
import errorCode from '@/utils/errorCode';
import useUserStore from '@/store/modules/user';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// 创建axios实例
const service = axios.create({
	// axios中请求配置有baseURL选项，表示请求URL公共部分
	baseURL: '/api',
	// 超时
	timeout: 10000,
});

// request拦截器
service.interceptors.request.use(
	(config) => {
		if (getToken()) {
			config.headers['Authorization'] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
		}
		return config;
	},
	(error) => {
		console.log(error);
		Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(res) => {
		// 未设置状态码则默认成功状态
		const code = res.data.code || 200;
		// 获取错误信息
		const msg = errorCode[code] || res.data.msg || errorCode['default'];
		// 二进制数据则直接返回
		if (
			res.request.responseType === 'blob' ||
			res.request.responseType === 'arraybuffer'
		) {
			return res.data;
		}
		if (code === 401) {
			ElMessageBox.confirm(
				'登录状态已过期，您可以继续留在该页面，或者重新登录',
				'系统提示',
				{
					confirmButtonText: '重新登录',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
				.then(() => {
					useUserStore()
						.logOut()
						.then(() => {
							location.href = '/';
						});
				})
				.catch(() => {});

			return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
		} else if (code === 500) {
			ElMessage({ message: msg, type: 'error' });
			return Promise.reject(new Error(msg));
		} else if (code === 601) {
			ElMessage({ message: msg, type: 'warning' });
			return Promise.reject(new Error(msg));
		} else if (code !== 200) {
			ElNotification.error({ title: msg });
			return Promise.reject('error');
		} else {
			return Promise.resolve(res.data);
		}
	},
	(error) => {
		console.log('err' + error);
		let { message } = error;
		if (message == 'Network Error') {
			message = '后端接口连接异常';
		} else if (message.includes('timeout')) {
			message = '系统接口请求超时';
		} else if (message.includes('Request failed with status code')) {
			message = '系统接口' + message.substr(message.length - 3) + '异常';
		}
		ElMessage({ message: message, type: 'error', duration: 5 * 1000 });
		return Promise.reject(error);
	}
);

export default service;
