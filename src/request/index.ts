import axios from "axios";

const baseURL = "http://127.0.0.1:8360/api/";

// @tarojs/plugin-http 小程序下 axios 全局拦截器无效
// https://github.com/NervJS/taro/issues/14305

const createAxios = (url: string, method?: string, data?: any) => {
  const instance = axios.create({
    baseURL: baseURL + url,
    method: (method = "GET"),
  });
  // 添加请求拦截器
  axios.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );

  // 添加响应拦截器
  axios.interceptors.response.use(
    (response) => {
      // 对响应数据做点什么
      return response.data ? response.data : response;
    },
    (error) => {
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
  return instance;
};

const request = async (url: string, method?: string, data?: any) => {
  const res = await createAxios(url, method, data)();
  if (res.data.errno === 0) {
    return res.data.data;
  }
  return res.data;
};

export default request;
