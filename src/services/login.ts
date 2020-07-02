import request from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function myFakeAccountLogin(params: LoginParamsType) {
  return request('/api/Home/Login', {
    method: 'POST',
    data: params,
    // requestType: 'form' // 后端请求token需要表单的形式
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

//获取菜单列表
export async function getMenuListByUID(params: number) {
  return request(`/api/User/GetMenuListByUID?uID=${params}`);
}