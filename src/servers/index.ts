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

export const ShowSettings = async () => await request({ url: "settings/showSettings" });

// 收货地址
export const AddressDetail = async () => await request({ url: "address/addressDetail" });//收货地址详情
export const DeleteAddress = async () => await request({ url: "address/deleteAddress" });//删除收货地址
export const SaveAddress = async () => await request({ url: "address/saveAddress" });//保存收货地址
export const GetAddresses = async () => await request({ url: "address/getAddresses" });

