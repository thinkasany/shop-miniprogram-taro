import request from "@/request";

// 登录
export const AuthLoginByWeixin = async (data) =>
  await request({
    url: "auth/loginByWeixin",
    method: "post",
    data: { info: data },
  }); //微信登录

//首页数据接口
export const IndexUrl = async () => await request({ url: "index/appInfo" });

export const ShowSettings = async () =>
  await request({ url: "settings/showSettings" });
