import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { AuthLoginByWeixin } from "@/servers/index";
import "./index.less";

const Index = () => {
  const [info, setInfo] = useState<any>({});
  useEffect(() => {}, []);
  const goBack = () => Taro.navigateBack();

  const getUserProfile = async () => {
    let code = "";
    Taro.login({
      success: function (res) {
        if (res.code) {
          code = res.code;
        } else {
          console.log("登录失败！" + res.errMsg);
        }
      },
    });
    // 获取用户信息
    Taro.getUserProfile({
      lang: "zh_CN",
      desc: "用户登录",
      success: async (res) => {
        // console.log("getUserProfile", res);
        const loginParams = {
          code,
          encryptedData: res.encryptedData,
          iv: res.iv,
          rawData: res.rawData,
          signature: res.signature,
        };
        await postLogin(loginParams);
      },
      // 失败回调
      fail: () => {
        // 弹出错误
        Taro.showToast({
          title: "已拒绝小程序获取信息",
          icon: "none",
        });
      },
    });
  };
  const postLogin = async (info) => {
    const res = await AuthLoginByWeixin(info);
    console.log("res", res);
    Taro.setStorageSync("userInfo", res.userInfo);
    Taro.setStorageSync("x-xzzshop-token", res.token);
    const is_new = res.is_new; //服务器返回的数据；
    if (is_new == 0) {
      Taro.showToast({ title: "您已经是老用户啦！", icon: "none" });
      Taro.navigateBack();
    } else if (is_new == 1) {
      Taro.navigateBack();
    }
  };
  return (
    <div className="container">
      <div className="logo">
        <img className="logo-img" src="/images/icon/loading.gif"></img>
      </div>
      <div className="logo-name">{info.title}</div>
      <div className="intro">{info.desc}</div>
      <div className="login">请完成微信授权以继续使用</div>
      {/* <button class='btn-login' open-type="getUserInfo" bindgetuserinfo='getUserInfo'>
        <image src='/images/icon/weixin-w.png' class='img-w'></image>
        <div class='text'>微信快捷登录</div>
    </button> */}
      <button className="btn-login" onClick={getUserProfile}>
        <div className="img-w"></div>
        <div className="text">微信快捷登录</div>
      </button>

      <div className="cancel" onClick={goBack}>
        取消
      </div>
    </div>
  );
};
export default Index;
