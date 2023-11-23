import locationIcon from "@/images/icon/location.png";
import Taro from "@tarojs/taro";
import { useState } from "react";
import "./index.less";

const Index = () => {
  const [payMethod, setPayMethod] = useState(1);
  const [freightPrice, setFreightPrice] = useState(0);
  const [goodsCount, setGoodsCount] = useState(0);
  const [goodsTotalPrice, setGoodsTotalPrice] = useState(0.0); //订单总价
  const [actualPrice, setActualPrice] = useState(0.0); //实际需要支付的总价
  const [orderTotalPrice, setOrderTotalPrice] = useState(0.0); //订单总价
  const [checkedAddress, setCheckedAddress] = useState<any>({});
  const [orderInfo, setOrderInfo] = useState<any>({});
  const [checkedGoodsList, setCheckedGoodsList] = useState<any[]>([]);

  Taro.useDidShow(async () => {
    const $instance = Taro.getCurrentInstance();
    if ($instance?.router?.params!.addtype) {
      console.log(
        "$instance?.router?.params!.addtype",
        $instance?.router?.params!.addtype
      );
    }
  });
  const toSelectAddress = () => {
    Taro.navigateTo({
      url: "/pages/center/address?type=1",
    });
  };
  const offlineOrder = () => {};
  const submitOrder = () => {};
  const bindinputMemo = () => {};
  return (
    <div className="container">
      <div className="wrap">
        <div className="address-box">
          <div className="receive-title">收货人</div>
          {checkedAddress.id > 0 ? (
            <div className="add-address" onClick={toSelectAddress}>
              <img className="addr-icon" src={locationIcon} />
              <div className="addr-r">
                <div className="show-address">
                  <div className="name-tel">
                    {checkedAddress.is_default && (
                      <div className="default-address">默认</div>
                    )}
                    {checkedAddress.name} {checkedAddress.mobile}
                  </div>
                  <div className="addr-text">
                    {checkedAddress.full_region + checkedAddress.address}
                  </div>
                </div>
                <div className="arrow"></div>
              </div>
            </div>
          ) : (
            <div className="add-address" onClick={toSelectAddress}>
              <img className="addr-icon" src={locationIcon} />
              <div className="addr-r">
                <div className="addr-title">请选择收货信息</div>
                <div className="arrow"></div>
              </div>
            </div>
          )}
        </div>
        <div className="goods-list">
          <div className="list-title">商品信息</div>
          <div className="a-goods">
            <div className="img-box">
              {checkedGoodsList.map((item, index) => {
                return (
                  <div
                    className="image-wrap"
                    key={index}
                    // wx:if="{{index<5}}"
                  >
                    {item.number > 0 && item.is_on_sale == 1 && (
                      <img
                        data-id={item.goods_id}
                        src={item.list_pic_url}
                        className="goods-image"
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div className="goods-sum">
              <div className="text">共{goodsCount}件</div>
            </div>
          </div>
        </div>
        <div className="price-check-wrap">
          <div className="row-box">
            <div className="row-label">商品总价</div>
            <div className="right-text">￥{goodsTotalPrice}</div>
          </div>
          <div className="row-box">
            <div className="row-label">快递</div>
            <div className="right-text">¥{freightPrice}</div>
          </div>
          <div className="memo-box">
            <div className="row-label">备注：</div>
            <div className="right-text memo-input">
              <input
                type="text"
                className="memo"
                onChange={bindinputMemo}
                value={orderInfo.postscript}
                placeholder="亲爱的买家，这里输入备注"
                cursor-spacing="100"
              />
            </div>
          </div>
          <div className="bottom-box">
            <div className="row-label">合计：</div>
            <div className="right-text price-to-pay">¥{orderTotalPrice}</div>
          </div>
        </div>
        {/* <!-- 如果不需要线下支付的这个功能，可将下面注释掉即可 -->
		<!-- <div className="pay-list">
            <div className="list-title">支付方式</div>
			<radio-group className="radio-group" bindchange="payChange">
                <radio className="radio" wx:for-items="{{payMethodItems}}" wx:key="name" value="{{item.name}}"
                 checked="{{item.checked}}">
                    {{item.value}}
                </radio>
            </radio-group>
        </div> -->
		<!-- --> */}
      </div>
      <div className="settle-box">
        <div className="left-price">
          <div className="total">实付：</div>
          <div className="pay-money">¥ {actualPrice}</div>
        </div>
        {payMethod == 0 ? (
          <button className="to-pay-btn" onClick={offlineOrder}>
            提交订单
          </button>
        ) : (
          <button className="to-pay-btn" onClick={submitOrder}>
            提交订单
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
