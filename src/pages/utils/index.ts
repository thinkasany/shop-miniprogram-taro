import Taro from "@tarojs/taro";
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

export { login, loginNow };
