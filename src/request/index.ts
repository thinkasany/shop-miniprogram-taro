import Taro from "@tarojs/taro";
// import interceptors from './interceptors';
// @tarojs/plugin-http 小程序下 axios 全局拦截器无效
// https://github.com/NervJS/taro/issues/14305

// interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

// 请求的默认参数
const defaultOptions = {
  url: "",
  method: "GET",
  data: {},
  loading: false,
};

// const baseURL = "http://127.0.0.1:8360/api/"; // thinkjs
const baseURL = "http://127.0.0.1:3000/api/"; // nest
export const mergeHeaders = (options) => {
  const token = Taro.getStorageSync("x-xzzshop-token") || "";
  const defaultHeaders = {
    "Content-Type": "application/json",
  };
  if (token) {
    options.header = {
      ...defaultHeaders,
      ...(options.header || {}),
      ["x-xzzshop-token"]: token,
    };
  } else {
    options.header = {
      ...defaultHeaders,
      ...(options.header || {}),
    };
  }
};
const request = (options): Promise<any> => {
  mergeHeaders(options);
  // 设置header统一的属性
  options = {
    ...defaultOptions,
    ...options,
  };
  // console.log("options", options);
  if (options.loading) Taro.showLoading();
  return new Promise((resolve: any, reject: any) => {
    Taro.request({
      url: options.url.startsWith("http") ? options.url : baseURL + options.url,
      data: options.data,
      header: {
        ...options.header,
        "X-Client-Is-WeChat": "true",
      },
      method: options.method.toUpperCase(),
      responseType: options.responseType,
      success: function (res) {
        const { data, statusCode, header } = res;

        if (data.data) {
          resolve(data.data);
        }
        resolve(data);
        // console.log(`http`, res);

        // }
      },
      fail: (error) => {
        reject(error);
      },
      complete: () => {
        if (options.loading) Taro.hideLoading();
      },
    });
  });
};

export default request;
