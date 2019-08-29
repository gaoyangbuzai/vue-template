import store from '../store/index';
import router from '../router/index';
import {cookier} from "./index";
/*
* HTTP响应拦截
* */
export function resInterceptors(response) {
  const auth = cookier.get('Authorization');

  if (!response.data) {
    let str=window.location.origin.split('.');
    let domain='.'+str[str.length-2]+'.'+str[str.length-1];
    cookier.set('Authorization', auth, 2, domain);
    return response;
  }
  if (response.data.code == '303001') {
    cookier.set('logoutPath', response.data.data + '/login');
    store.commit('logout', {focus: true}, {root: true});
    return Promise.reject('您未获得授权，请重新登录');
  }
  if (response.data.code == '302001') {
    cookier.set('logoutPath', response.data.data + '/login');
    return Promise.reject('用户权限不足，请更换账号登录');
  }
  let str=window.location.origin.split('.');
  let domain='.'+str[str.length-2]+'.'+str[str.length-1];
  cookier.set('Authorization', auth, 2, domain);
  return response.data;
}

// // 请求拦截，在APP.vue里设置（需要获得权限）
export function reqInterceptors(config) {
  return config;
}
