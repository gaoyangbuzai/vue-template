import axios from 'axios'
import { resInterceptors, reqInterceptors } from './http-interceptors';

let NODE_ENV = process.env.NODE_ENV;
let API_BASE = process.env.VUE_APP_API_BASE || '/api';
const mAxios = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },
    timeout: 40000
    // withCredentials: true
});

// http request 拦截
mAxios.interceptors.request.use(config => {
    return reqInterceptors(config);
}, error => {
    return Promise.reject(error);
});
// http respone 拦截
mAxios.interceptors.response.use(
    response => {
        // 拦截器
        return resInterceptors(response);
    },
    error => {
        if (error.response) {
            switch (error.response && error.response.status) {
                case 403:
                    // Message.error('无权限请求该资源！');
                    break;
                case 404:
                    // Message.error('请求地址未找到！');
                    break;
                case 405:
                    // Message.error('请求方式错误！');
                    break;
                case 429:
                    // Message.error('请求次数过多，请稍后重试！');
                    break;
                case 500:
                    // Message.error('服务器错误，请稍后重试');
                    break;
                case 502:
                    // Message.error('服务器暂不可用，请稍后重试！');
                    break;
                case 503:
                    // Message.error('网关错误！');
                    break;
                case 200:
                    //xhr.success(JSON.parse(xhr.responseText));
                    break;
                case 0:
                default:
                    // 0可能是网络错误? 可能是连接超时
                    if (error.code === 'ECONNABORTED') {
                        // 超时
                        // Message.error('请求超时，请稍后重试');
                    } else if (error.this.$message && error.this.$message === 'cancel') {
                        // 取消请求，不做处理
                    } else {
                        // 其他未知错误，通常为无网络
                        // Message.error('请求资源失败，请检查网络状况，稍后重试');
                    }
            }
        } else {
            // Message.error('请检查您的网络情况');
        }
        return Promise.reject(error);
    }
);

export default mAxios;