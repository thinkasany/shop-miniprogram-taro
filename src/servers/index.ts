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
export const getAddressDetail = async (data) => await request({ url: "address/addressDetail", data });//收货地址详情
export const DeleteAddress = async () => await request({ url: "address/deleteAddress" });//删除收货地址
export const SaveAddress = async (data) => await request({ url: "address/saveAddress", method: "post", data });//保存收货地址
export const GetAddresses = async () => await request({ url: "address/getAddresses" });
export const RegionList = async (data) => await request({ url: "region/list", data });//获取区域列表

// 足迹
export const FootprintList = async (data) => await request({ url: "footprint/list", data }); //足迹列表
export const FootprintDelete = async (data) => await request({ url: "footprint/delete", data }); //删除足迹


