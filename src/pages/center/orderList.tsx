/* eslint-disable react/jsx-key */
import noOrderPng from "@/images/icon/no-order.png";
import { useState } from "react";
import { OrderCountInfo, OrderList } from "@/servers";
import Taro from "@tarojs/taro";
import "./orderList.less";

const OrderListComponent = () => {
  const [showTips, setShowTips] = useState(0);
  const [showType, setShowType] = useState(0);
  const [allPage, setAllPage] = useState(1);
  const [allCount, setAllCount] = useState(0);
  const [size, setSize] = useState(8);
  const [status, setStatus] = useState<any>({});
  const [orderList, setOrderList] = useState<any>([]);

  Taro.useDidShow(() => {
    const showType = Taro.getStorageSync("showType");
    setShowType(Number(showType));
    getOrderList();
    getOrderInfo();
  });
  const getOrderList = (showType = 0) => {
    OrderList({ showType, size, page: allPage }).then((res) => {
      console.log("res", res);
      const { count, currentPage, data } = res;
      setAllCount(count);
      setOrderList(data);
      setAllPage(currentPage);
    });
  };
  const getOrderInfo = async () => {
    const res = await OrderCountInfo();
    setStatus(res);
  };
  const switchTab = (event) => {
    const showType = event.currentTarget.dataset.index;
    console.log("showType", showType);
    Taro.setStorageSync("showType", showType);
    setShowType(Number(showType));
    setOrderList([]);
    setAllPage(1);
    setAllCount(0);
    setSize(8);
    getOrderList(showType);
    getOrderInfo();
  };
  const payOrder = () => {};
  const toIndexPage = () => {
    Taro.switchTab({
      url: "/pages/index/index",
    });
  };
  const toOrderDetails = (e) => {
    const orderId = e.currentTarget.dataset.id;
    Taro.setStorageSync("orderId", orderId);
    Taro.navigateTo({
      url: "/pages/center/orderDetail",
    });
  };
  return (
    <div className="container">
      <div className="tab-nav">
        <div
          className={`tab ${showType === 0 ? "active" : ""}`}
          onClick={switchTab}
          data-index="0"
        >
          全部
        </div>
        <div
          className={`tab ${showType === 1 ? "active" : ""}`}
          onClick={switchTab}
          data-index="1"
        >
          {status.toPay > 0 && <div className="list-num">{status.toPay}</div>}
          待付款
        </div>
        <div
          className={`tab ${showType === 2 ? "active" : ""}`}
          onClick={switchTab}
          data-index="2"
        >
          {status.toDelivery > 0 && (
            <div className="list-num">{status.toDelivery}</div>
          )}
          待发货
        </div>
        <div
          className={`tab ${showType === 3 ? "active" : ""}`}
          onClick={switchTab}
          data-index="3"
        >
          {status.toReceive > 0 && (
            <div className="list-num">{status.toReceive}</div>
          )}
          待收货
        </div>
      </div>

      {orderList.length <= 0 ? (
        <div className="no-order {{hasOrder == 1? 'show':'' }}">
          <img src={noOrderPng} className="no-order-img"></img>
          <div className="text">您目前没有相关订单</div>
          <div className="to-index-btn" onClick={toIndexPage}>
            马上去逛逛
          </div>
        </div>
      ) : (
        <div className="wrap">
          {/* <!--  待付款  --> */}
          {orderList.map((item) => {
            return (
              <div
                onClick={toOrderDetails}
                className="order-list-wrap"
                data-id={item.id}
              >
                <div className="list-top-wrap">
                  <div className="time">{item.add_time}</div>
                  <div className="status">
                    {!!item.offline_pay && (
                      <div className="pay-status">线下支付订单</div>
                    )}

                    <div className="order-status">{item.order_status_text}</div>
                  </div>
                </div>
                <div className="goods-list">
                  <div className="a-goods">
                    <div className="img-box">
                      {item.goodsList.map((gitem) => {
                        return (
                          <div
                            className="image-wrap"
                            // wx:if="{{index<4}}"
                          >
                            <img
                              src={gitem.list_pic_url}
                              className="goods-image"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="goods-sum">
                      <div className="text">共{item.goodsCount}件</div>
                      <div className="arrow"></div>
                    </div>
                  </div>
                </div>
                <div className="order-price-wrap">
                  <div className="order-price">
                    <div className="price-label">总价：¥</div>
                    <div className="price-sum">{item.actual_price}</div>
                  </div>
                  <div className="trans">(含运费 ¥{item.freight_price})</div>
                </div>
                {/* <!-- 待付款 --> */}
                {item.handleOption.cancel && item.handleOption.pay ? (
                  <div className="order-edit">
                    <div
                      onClick={payOrder}
                      className="edit-btn"
                      data-orderid={item.id}
                    >
                      继续支付
                    </div>
                  </div>
                ) : (
                  <div className="order-edit">
                    <div className="dele-btn">查看详情</div>
                  </div>
                )}
              </div>
            );
          })}

          {!!showTips && <div className="no-more-goods">没有更多商品啦</div>}
        </div>
      )}
    </div>
  );
};

export default OrderListComponent;
