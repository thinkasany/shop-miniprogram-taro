import { useState } from "react";
import defaultAvatarPng from "@/images/icon/default_avatar_big.png";
import iconPayR from "@/images/icon/icon-pay-r.png";
import iconDeliveryR from "@/images/icon/icon-delivery-r.png";
import iconOnroadR from "@/images/icon/icon-onroad-r.png";
import iconAddressR from "@/images/icon/icon-address-r.png";
import iconFootPrintR from "@/images/icon/icon-footprint-r.png";
import iconserviceR from "@/images/icon/icon-service-r.png";
import iconAboutR from "@/images/icon/icon-about-r.png";
import Taro from "@tarojs/taro";
import { loginNow } from "@/utils";
import { OrderCountInfo } from "@/servers";

import "./index.less";

const Index = () => {
  const [hasUserInfo, setHasUserInfo] = useState(true);
  const [userInfo, setUserInfo] = useState<any>({});
  const [info, setInfo] = useState<any>({});
  const [status, setStatus] = useState<any>({});
  Taro.useDidShow(() => {
    const globalData = Taro.getStorageSync("globalData");
    setInfo(globalData.info);
    const userInfo = Taro.getStorageSync("userInfo");
    if (userInfo === "") {
      setHasUserInfo(false);
    } else {
      setHasUserInfo(true);
    }
    setUserInfo(userInfo);
    // console.log("globalData", globalData);
    // console.log("userInfo", userInfo);
    getOrderInfo();
    Taro.removeStorageSync("categoryId");
  });
  const goProfile = () => {
    if (loginNow()) {
      Taro.navigateTo({
        url: "/pages/center/setting",
      });
    }
  };
  const toOrderListTap = (event) => {
    if (loginNow()) {
      const showType = event.currentTarget.dataset.index;
      Taro.setStorageSync("showType", showType);

      Taro.navigateTo({
        url: "/pages/center/orderList?showType=" + showType,
      });
    }
  };
  const toAddressList = () => {
    if (loginNow()) {
      Taro.navigateTo({
        url: "/pages/center/address?type=0",
      });
    }
  };
  const toFootprint = () => {
    if (loginNow()) {
      Taro.navigateTo({
        url: "/pages/center/footprint",
      });
    }
  };
  const toAbout = () => {
    Taro.navigateTo({
      url: "/pages/center/about",
    });
  };
  const getOrderInfo = () => {
    OrderCountInfo().then((res) => {
      setStatus(res);
    });
  };
  const goAuth = () => {
    Taro.navigateTo({
      url: "/pages/app-auth/index",
    });
  };

  return (
    <div className="container">
      <div className="userinfo">
        {!hasUserInfo ? (
          <div className="head-wrap" onClick={goAuth}>
            <div className="no-login-avatar">
              <div className="no-avatar">
                <img className="avatar" src={defaultAvatarPng}></img>
              </div>
              <div className="btn-login">点我登录</div>
            </div>
          </div>
        ) : (
          <div className="head-wrap" onClick={goProfile}>
            <div className="head-l">
              <div className="l">
                <img className="avatar" src={userInfo.avatar}></img>
              </div>
              <div className="r">
                <div className="t">
                  <div className="name">{userInfo.nickname}</div>
                </div>
              </div>
            </div>
            <div className="head-r">
              <div className="arrow"></div>
            </div>
          </div>
        )}
      </div>
      <div className="order-container">
        <div className="header" data-index="0" onClick={toOrderListTap}>
          <div className="top-title">
            <div className="left-line"></div>
            <div className="text">我的订单</div>
          </div>
          <div className="see-more">
            <div className="text">查看全部订单</div>
            <div className="arrow"></div>
          </div>
        </div>
      </div>

      <div className="btn-container">
        <div className="icon-wrap" data-index="1" onClick={toOrderListTap}>
          <div className="order-icon-wrap">
            <img className="order-icon" src={iconPayR}></img>
            {status.toPay > 0 && (
              <div className="red-point">{status.toPay}</div>
            )}
          </div>
          <text className="order-txt">待付款</text>
        </div>
        <div className="icon-wrap" data-index="2" onClick={toOrderListTap}>
          <div className="order-icon-wrap">
            <img className="order-icon" src={iconDeliveryR}></img>
            {status.toDelivery > 0 && (
              <div className="red-point">{status.toDelivery}</div>
            )}
          </div>
          <text className="order-txt">待发货</text>
        </div>
        <div className="icon-wrap" data-index="3" onClick={toOrderListTap}>
          <div className="order-icon-wrap">
            <img className="order-icon" src={iconOnroadR}></img>
            {status.toReceive > 0 && (
              <div className="red-point">{status.toReceive}</div>
            )}
          </div>
          <text className="order-txt">待收货</text>
        </div>
      </div>

      <div className="li-wrap">
        <div className="list" onClick={toAddressList}>
          <div className="list-l">
            <div className="icon">
              <img className="img" src={iconAddressR}></img>
            </div>
            <div className="text">地址管理</div>
          </div>
          <div className="arrow"></div>
        </div>
      </div>
      <div className="li-wrap">
        <div className="list" onClick={toFootprint}>
          <div className="list-l">
            <div className="icon">
              <img className="img" src={iconFootPrintR}></img>
            </div>
            <div className="text">我的足迹</div>
          </div>
          <div className="arrow"></div>
        </div>
        <button
          className="contact-btn"
          // session-from='{"nickName":"{{userInfo.nickname}}","avatarUrl":"{{userInfo.avatar}}"}'
          open-type="contact"
        >
          <div className="list-l">
            <div className="icon">
              <img className="img" src={iconserviceR}></img>
            </div>
            <div className="text">联系客服</div>
          </div>
          <div className="arrow"></div>
        </button>
        <div className="list" onClick={toAbout}>
          <div className="list-l">
            <div className="icon">
              <img className="img" src={iconAboutR}></img>
            </div>
            <div className="text">关于我们</div>
          </div>
          <div className="arrow"></div>
        </div>
      </div>
      <div className="company">
        <div className="c-wrap" onClick={getOrderInfo}>
          <div className="text">-{info.desc}-</div>
        </div>
      </div>
    </div>
  );
};
export default Index;
