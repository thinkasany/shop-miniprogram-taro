import toPayIcon from "@/images/icon/to-pay-w.png";
import toCloseIcon from "@/images/icon/to-close-w.png";
import toDeliveryIcon from "@/images/icon/to-delivery-w.png";
import toReceiveIcon from "@/images/icon/to-receive-w.png";
import toSuccessIcon from "@/images/icon/success-w.png";
import contactIcon from "@/images/icon/contact.png";
import locationIcon from "@/images/icon/location.png";
import loadingIcon from "@/images/icon/loading.gif";
import { useState } from "react";
import { Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { OrderExpressInfo, OrderDetail } from "@/servers";
import "./orderDetail.less";

const OrderDedeail = () => {
  const [orderInfo, setOrderInfo] = useState<any>({});
  const [textCode, setTextCode] = useState<any>({});
  const [wxTimerList, setWxTimerList] = useState<any>({});
  const [handleOption, setHandleOption] = useState<any>({});
  const [express, setExpress] = useState<any>({});
  const [orderGoods, setOrderGoods] = useState<any>([]);
  const [goodsCount, setGoodsCount] = useState(0);
  const [onPosting, setOnPosting] = useState(0);
  const c_remainTime: any = {};
  Taro.useDidShow(() => {
    const orderId = Taro.getStorageSync("orderId");
    getOrderDetail(orderId);
    getExpressInfo(orderId);
  });
  const getOrderDetail = (orderId) => {
    OrderDetail({ orderId }).then((res) => {
      const { orderInfo, orderGoods, handleOption, textCode, goodsCount } = res;
      setOrderInfo(orderInfo);
      setOrderGoods(orderGoods);
      setHandleOption(handleOption);
      setTextCode(textCode);
      setGoodsCount(goodsCount);
      if (textCode.receive) {
      }
      console.log(res);
    });
  };
  const getExpressInfo = (orderId) => {
    setOnPosting(0);
    OrderExpressInfo({ orderId }).then((res) => {
      console.log(res);
    });
  };
  const copyText = (e) => {
    const data = e.currentTarget.dataset.text;
    Taro.setClipboardData({
      data: data,
      success(res) {
        Taro.getClipboardData({
          success(res) {},
        });
      },
    });
  };
  const clearTimer = () => {};
  const deleteOrder = () => {};
  const confirmOrder = () => {};
  const reOrderAgain = () => {
    const orderId = Taro.getStorageSync("orderId");
    Taro.redirectTo({
      url: "/pages/order-check/index?addtype=2&orderFrom=" + orderId,
    });
  };
  const toGoodsList = () => {};
  const cancelOrder = () => {};
  const payOrder = () => {};
  const bindinputMemo = () => {};
  const toExpressInfo = () => {};
  return (
    <div className="container">
      {/* <!--   TODO 将状态码都去掉！  --> */}
      <div className="status-wrap" onClick={clearTimer}>
        <div className="status-text">
          {textCode.pay && <img className="icon to-pay" src={toPayIcon} />}
          {textCode.close && (
            <img className="icon to-close" src={toCloseIcon} />
          )}
          {textCode.delivery && (
            <img className="icon to-delivery" src={toDeliveryIcon} />
          )}
          {textCode.receive && (
            <img className="icon to-receive" src={toReceiveIcon} />
          )}
          {textCode.success && (
            <img className="icon to-success" src={toSuccessIcon} />
          )}
          <div className="text">{orderInfo.order_status_text}</div>
        </div>
        {textCode.success && (
          <div className="count-wrap">
            <div className="time-text"></div>
            <div className="count-down-time">
              {!!c_remainTime.day && (
                <div className="day">{c_remainTime.day}天</div>
              )}
              {!!c_remainTime.hour && (
                <div className="hour">{c_remainTime.hour}小时</div>
              )}
              {!!c_remainTime.minute && (
                <div className="minute">{c_remainTime.minute}分</div>
              )}
            </div>
            {c_remainTime.minute != 0 ? (
              <div className="time-text">后自动收货</div>
            ) : (
              <div className="time-text">即将自动收货</div>
            )}
          </div>
        )}
        {textCode.countdown && (
          <div className="count-wrap">
            <div className="time-text"></div>
            <div className="count-down-time">
              <div className="hour">{wxTimerList.orderTimer.wxHour}小时</div>
              <div className="minute">{wxTimerList.orderTimer.wxMinute}分</div>
              <div className="seconds">
                {wxTimerList.orderTimer.wxSeconds}秒
              </div>
            </div>
            <div className="time-text">后自动关闭</div>
          </div>
        )}
      </div>
      <div className="address-box">
        <img className="addr-icon" src={locationIcon} />
        <div className="show-address">
          <div className="name-tel">
            {orderInfo.consignee} {orderInfo.mobile}
          </div>
          <div className="addr-text">
            {orderInfo.full_region + orderInfo.address}
          </div>
        </div>
      </div>
      {!!orderInfo.shipping_status && onPosting == 0 && (
        <div className="onPosting">
          <img className="loading" src={loadingIcon} />
          <div className="t">快递信息查询中。。。</div>
        </div>
      )}
      {!!orderInfo.shipping_status && onPosting == 1 && (
        <div className="express">
          <div className="express-info-header">
            {express.traces.length == 0 ? (
              <div className="list-title">物流信息</div>
            ) : (
              <div className="title-wrap">
                <div className="no">
                  {express.shipper_name}：{express.logistic_code}
                </div>
                <button
                  className="copy-text"
                  data-text={express.logistic_code}
                  onClick={copyText}
                >
                  复制快递单号
                </button>
              </div>
            )}
            {express.is_finish == 1 && (
              <div className="express-status">已签收</div>
            )}
            {express.is_finish == 0 && express.traces.length == 0 && (
              <div className="express-status">已发货</div>
            )}
            {express.is_finish == 0 && express.traces.length != 0 && (
              <div className="express-status">运输中</div>
            )}
          </div>
          {express.logistic_code == "" && (
            <div className="no-express-info-wrap">
              <div className="express-info">暂无物流信息</div>
            </div>
          )}
          {express.logistic_code != "" && express.traces.length == 0 ? (
            <div className="no-express-info-wrap">
              <div className="express-info">
                {express.shipper_name}：{express.logistic_code}
              </div>
              <button
                className="copy-text"
                data-text={express.logistic_code}
                onClick={copyText}
              >
                复制快递单号
              </button>
            </div>
          ) : (
            <div className="express-info-wrap" onClick={toExpressInfo}>
              <div className="l">
                <div className="express-info">{express.traces[0].status}</div>
                <div className="express-time">{express.traces[0].time}</div>
              </div>
              <div className="arrow"></div>
            </div>
          )}
        </div>
      )}
      <div className="goods-list" onClick={toGoodsList}>
        <div className="list-info-wrap">
          <div className="list-title">商品信息</div>
        </div>
        <div className="a-goods">
          <div className="img-box">
            {orderGoods.map((item, index) => {
              return (
                <div className="image-wrap" key={index}>
                  <img src={item.list_pic_url} className="goods-image" />
                </div>
              );
            })}
          </div>
          <div className="goods-sum">
            <div className="text">共{goodsCount}件</div>
            <div className="arrow"></div>
          </div>
        </div>
      </div>

      <div className="price-check-wrap">
        <div className="row-box">
          <div className="row-label">商品总价</div>
          <div className="right-text">¥{orderInfo.goods_price}</div>
        </div>
        <div className="row-box">
          <div className="row-label">快递</div>
          <div className="right-text">¥{orderInfo.freight_price}</div>
        </div>
        <div className="memo-box">
          <div className="row-label memo-label">备注</div>
          <div className="right-text memo-input">
            {!handleOption.cancel && (
              <div className="memo-disable">
                {orderInfo.postscript ? orderInfo.postscript : "无"}
              </div>
            )}
            {handleOption.cancel && handleOption.pay && (
              <Input
                type="text"
                className="memo"
                onInput={bindinputMemo}
                value={orderInfo.postscript}
                placeholder="亲爱的买家，这里输入备注"
              />
            )}
          </div>
        </div>
        <div className="bottom-box">
          <div className="row-label">合计：</div>
          <div className="right-text price-to-pay">
            ¥{orderInfo.actual_price}
          </div>
          {orderInfo.change_price != orderInfo.actual_price && (
            <div className="change-price">(改价)</div>
          )}
        </div>
      </div>
      <div className="order-info">
        <div className="row-box-wrap">
          <div className="row-box2">
            <div className="row-label2">订单编号：</div>
            <div className="right-text2">{orderInfo.order_sn}</div>
          </div>
          <div className="row-box2">
            <div className="row-label2">创建时间：</div>
            <div className="right-text2">{orderInfo.add_time}</div>
          </div>
          {!!orderInfo.pay_time && (
            <div className="row-box2">
              <div className="row-label2">支付交易号：</div>
              <div className="right-text2">{orderInfo.pay_id}</div>
            </div>
          )}
          {!!orderInfo.pay_time && (
            <div className="row-box2">
              <div className="row-label2">付款时间：</div>
              <div className="right-text2">{orderInfo.pay_time}</div>
            </div>
          )}
          {!!orderInfo.shipping_time && (
            <div className="row-box2">
              <div className="row-label2">发货时间：</div>
              <div className="right-text2">{orderInfo.shipping_time}</div>
            </div>
          )}
          {!!orderInfo.confirm_time && (
            <div className="row-box2">
              <div className="row-label2">确认时间：</div>
              <div className="right-text2">{orderInfo.confirm_time}</div>
            </div>
          )}
          {!!orderInfo.dealdone_time && (
            <div className="row-box2">
              <div className="row-label2">完成时间：</div>
              <div className="right-text2">{orderInfo.dealdone_time}</div>
            </div>
          )}
        </div>
      </div>
      {handleOption.cancel && handleOption.pay ? (
        <div className="bottom-fixed-box display-between">
          <div
            className="to-cancel-btn"
            data-index="{{orderId}}"
            onClick={cancelOrder}
          >
            取消订单
          </div>
          <button className="to-pay-btn" onClick={payOrder}>
            继续支付
          </button>
        </div>
      ) : (
        <div className="bottom-fixed-box display-between">
          <button
            className="call-service"
            session-from='{"nickName":"{{userInfo.nickname}}","avatarUrl":"{{userInfo.avatar}}"}'
            open-type="contact"
            show-message-card="true"
            hover-className="none"
          >
            <img className="icon" src={contactIcon} />
            <div className="text">联系客服</div>
          </button>
          {handleOption.delete && (
            <div onClick={deleteOrder} className="btn-default">
              删除订单
            </div>
          )}
          {handleOption.confirm && (
            <div onClick={confirmOrder} className="btn-red">
              确认收货
            </div>
          )}

          <div className="btn-red" onClick={reOrderAgain}>
            再来一单
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDedeail;
