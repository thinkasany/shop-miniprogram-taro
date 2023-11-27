import { PayPrepayId } from "@/servers";
import Taro from "@tarojs/taro";

const payOrder = (orderId) => {
  return new Promise((resolve, reject) => {
    PayPrepayId({ orderId })
      .then((res) => {
        console.log("res", res);
        if (res) {
          const payParam = res.data;
          // 如果没有支付想直接支付成功，下面注释。
          // -----------------------------------
          console.log("payParam", payParam);
          // Taro.requestPayment({
          //   timeStamp: payParam.timeStamp,
          //   nonceStr: payParam.nonceStr,
          //   package: payParam.package,
          //   signType: payParam.signType,
          //   paySign: payParam.paySign,
          //   success: function (res) {
          //     console.log("succ", res);
          //     resolve(res);
          //   },
          //   fail: function (res) {
          //     reject(res);
          //   },
          //   complete: function (res) {
          //     reject(res);
          //   },
          // });
          // -----------------------------------

          // =================================
          // 直接支付成功，下面打开，上面注释
          // resolve(res);
          // =================================
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export default payOrder;
