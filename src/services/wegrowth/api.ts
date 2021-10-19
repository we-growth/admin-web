// @ts-ignore
/* eslint-disable */
import { extend } from 'umi-request';

const request = extend({ timeout: 5000 });

//Token的拦截器

request.interceptors.request.use((url, options) => {
  let token = localStorage.getItem('Token');
  if (token) {
    const headers = {
      Authorization: 'Bearer ' + token,
    };
    return {
      url: url,
      options: { ...options, headers: headers },
    };
  } else {
    return {
      url: url,
      options: { ...options },
    };
  }
});

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  console.log(`${API_URL}`);
  return request<API.LoginResult>(`${API_URL}/as/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  console.log('api_url:${API_URL}');
  return request<any>(`${API_URL}/uaa/api/currentUser`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`${API_URL}/uaa/api/logout`, {
    method: 'POST',
    ...(options || {}),
  });
}

/** 新建用户 POST /api/rule */
export async function addUser(data?: { [key: string]: any }) {
  return request<any>(`${API_URL}/uaa/api/public/register`, {
    method: 'POST',
    requestType: 'json',
    data: data,
    // ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    page?: number;
    /** 页面的容量 */
    size?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.UserList>(`${API_URL}/uaa/api/users`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
