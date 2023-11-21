import request from "@/request";

//首页数据接口
export const IndexUrl = async () => await request("index/appInfo");

export const ShowSettings = async () => await request("settings/showSettings")
