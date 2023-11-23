import payErrorIcon from "@/images/icon/pay-error.png";
import contactIcon from "@/images/icon/contact.png";
import paySuccessIcon from "@/images/icon/pay-success.png";
import { useState } from "react";
import Taro from "@tarojs/taro";
import "./index.less";

const Index = () => {
  const [status, setStatus] = useState(0);
  const [orderId, setOrderId] = useState("");
  Taro.useDidShow(async () => {
    const $instance = Taro.getCurrentInstance();
    console.log("$instance?.router?.params;", $instance?.router?.params);
    const { status, orderId } = $instance?.router?.params as any;
    setStatus(Number(status));
    setOrderId(orderId);
  });
  const toIndex = () => {};
  const toOrderListPage = () => {
    Taro.switchTab({
      url: "/pages/ucenter/index",
    });
  };
  const payOrder = () => {};
  return (
    <div className="container">
      {status === 1 ? (
        <div className="result-wrap">
          <div className="image-wrap">
            <img src={paySuccessIcon} className="success-img" />
          </div>
          <div className="text-wrap">
            <div className="success-text">付款成功</div>
            <div className="success-text">马上开始打包</div>
          </div>
          <div className="to-order-btn" onClick={toIndex}>
            继续逛逛
          </div>
          <div className="btn-go-order" onClick={toOrderListPage}>
            返回我的页面
          </div>
        </div>
      ) : (
        <div className="result-wrap">
          <div className="image-wrap">
            <img src={payErrorIcon} className="success-img" />
          </div>
          <div className="text-wrap">
            <div className="text">支付失败</div>
            <button
              className="contact-wrap"
              session-from='{"nickName":"{{userInfo.nickname}}","avatarUrl":"{{userInfo.avatar}}"}'
              open-type="contact"
              // session-from="weapp"
            >
              <img src={contactIcon} className="contact-icon" />
              <div className="contact">联系客服</div>
            </button>
          </div>
          <div className="to-order-btn" onClick={payOrder}>
            重新付款
          </div>
          <div className="btn-go-order" onClick={toOrderListPage}>
            返回我的页面
          </div>
        </div>
      )}

      {/* <!-- <ad className="ad-video" unit-id="adunit-f572025851df64b3" ad-type="video" ad-theme="white"></ad> --> */}
    </div>
  );
};

export default Index;
