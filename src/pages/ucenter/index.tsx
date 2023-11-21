import { useState } from "react";
import defaultAvatarPng from "@/images/icon/default_avatar_big.png";
import iconPayR from "@/images/icon/icon-pay-r.png";
import iconDeliveryR from "@/images/icon/icon-delivery-r.png";
import iconOnroadR from "@/images/icon/icon-onroad-r.png";
import iconAddressR from "@/images/icon/icon-address-r.png";
import iconFootPrintR from "@/images/icon/icon-footprint-r.png";
import iconserviceR from "@/images/icon/icon-service-r.png";
import iconAboutR from "@/images/icon/icon-about-r.png";

import "./index.less";

const Index = () => {
  const [hasUserInfo, setHasUserInfo] = useState(true);
  const [userInfo, setUserInfo] = useState<any>({});
  const [info, setInfo] = useState<any>({});

  const goProfile = () => console.log("11");
  const toOrderListTap = () => console.log("11");
  const toAddressList = () => console.log("11");
  const toFootprint = () => console.log("11");
  const toAbout = () => console.log("11");
  const getOrderInfo = () => console.log("11");

  return (
    <div className="container">
      <div className="userinfo">
        {hasUserInfo ? (
          <div className="head-wrap" onClick={goProfile}>
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
      {/* <!-- <ad unit-id="adunit-89ae0a0b6860dc9f" ad-type="grid" grid-opacity="0.8" grid-count="5" ad-theme="white"></ad> --> */}
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
            {/* <div wx:if="{{status.toPay > 0 }}" className='red-point'>{{status.toPay}}</div> */}
          </div>
          <text className="order-txt">待付款</text>
        </div>
        <div className="icon-wrap" data-index="2" onClick={toOrderListTap}>
          <div className="order-icon-wrap">
            <img className="order-icon" src={iconDeliveryR}></img>
            {/* <div wx:if="{{status.toDelivery > 0 }}" className='red-point'>{{status.toDelivery}}</div> */}
          </div>
          <text className="order-txt">待发货</text>
        </div>
        <div className="icon-wrap" data-index="3" onClick={toOrderListTap}>
          <div className="order-icon-wrap">
            <img className="order-icon" src={iconOnroadR}></img>
            {/* <div wx:if="{{status.toReceive > 0 }}" className='red-point'>{{status.toReceive}}</div> */}
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
