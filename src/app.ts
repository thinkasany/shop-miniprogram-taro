import { PropsWithChildren } from "react";
import Taro, { useLaunch } from "@tarojs/taro";
import { ShowSettings } from "@/servers";
import "./app.less";

function App({ children }: PropsWithChildren<any>) {
  const globalData: any = {
    userInfo: {
      nickname: "点我登录",
      username: "点击登录",
      avatar: "http://lucky-icon.meiweiyuxian.com/hio/default_avatar_big.png",
    },
    token: "",
    info: null,
  };
  useLaunch(async () => {
    const info = await ShowSettings();
    globalData.info = info;

    Taro.getSetting({
      success: (res) => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          Taro.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              globalData.userInfo = res.userInfo;
              Taro.setStorageSync("globalData", globalData);
              // console.log(res);

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
            },
          });
        }
      },
    });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
