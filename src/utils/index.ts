import Taro from "@tarojs/taro";
import payOrder from "./payOrder";
/**
 * 调用微信登录
 */
const login = () => {
  return new Promise(function (resolve, reject) {
    Taro.login({
      success: function (res) {
        if (res.code) {
          //登录远程服务器
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function (err) {
        reject(err);
      },
    });
  });
};

const loginNow = () => {
  const userInfo = Taro.getStorageSync("userInfo");
  if (!userInfo) {
    Taro.navigateTo({
      url: "/pages/app-auth/index",
    });
    return false;
  } else {
    return true;
  }
};

function showErrorToast(msg) {
  Taro.showToast({
    title: msg,
    image: "/images/icon/icon_error.png",
  });
}

function showSuccessToast(msg) {
  Taro.showToast({
    title: msg,
    icon: "success",
  });
}

function testMobile(num) {
  const myreg =
    /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(16[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
  if (num.length == 0) {
    Taro.showToast({
      title: "手机号为空",
      image: "/images/icon/icon_error.png",
    });
    return false;
  } else if (num.length < 11) {
    Taro.showToast({
      title: "手机号长度有误！",
      image: "/images/icon/icon_error.png",
    });
    return false;
  } else if (!myreg.test(num)) {
    Taro.showToast({
      title: "手机号有误！",
      image: "/images/icon/icon_error.png",
    });
    return false;
  } else {
    return true;
  }
}

export {
  login,
  loginNow,
  showErrorToast,
  showSuccessToast,
  testMobile,
  payOrder,
};
