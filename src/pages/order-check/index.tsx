import locationIcon from "@/images/icon/location.png";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { CartCheckout, OrderSubmit } from "@/servers";
import { Input } from "@tarojs/components";
import { showErrorToast } from "@/utils";
import "./index.less";

const Index = () => {
  const [payMethod, setPayMethod] = useState(1);
  const [addressId, setAddressId] = useState(0);
  // const [addType, setAddType] = useState<null | string>(null);
  // const [orderFrom, setOrderFrom] = useState<any>(null);
  const [freightPrice, setFreightPrice] = useState(0);
  const [goodsCount, setGoodsCount] = useState(0);
  const [goodsTotalPrice, setGoodsTotalPrice] = useState(0.0); //订单总价
  const [actualPrice, setActualPrice] = useState(0.0); //实际需要支付的总价
  const [orderTotalPrice, setOrderTotalPrice] = useState(0.0); //订单总价
  const [checkedAddress, setCheckedAddress] = useState<any>({});
  const [orderInfo, setOrderInfo] = useState<any>({});
  const [checkedGoodsList, setCheckedGoodsList] = useState<any[]>([]);
  const [postscript, setPostscript] = useState("");

  Taro.useDidShow(async () => {
    const $instance = Taro.getCurrentInstance();
    const { orderFrom = {}, addtype: addType } = $instance?.router
      ?.params as any;
    const addressId = Taro.getStorageSync("addressId");
    getCheckoutInfo({ orderFrom, addType, addressId });
  });

  const getCheckoutInfo = async ({ orderFrom, addType, addressId }) => {
    const data = await CartCheckout({
      addressId,
      addType,
      orderFrom,
      type: 0,
    });
    const {
      checkedGoodsList,
      checkedAddress,
      actualPrice,
      addressId: currentAddressId,
      freightPrice,
      goodsTotalPrice,
      orderTotalPrice,
      goodsCount,
      outStock,
      numberChange,
    } = data;
    setCheckedGoodsList(checkedGoodsList);
    setCheckedAddress(checkedAddress);
    setActualPrice(actualPrice);
    setAddressId(currentAddressId);
    setFreightPrice(freightPrice);
    setGoodsTotalPrice(goodsTotalPrice);
    setOrderTotalPrice(orderTotalPrice);
    setGoodsCount(goodsCount);
    setOrderInfo(outStock);
    Taro.setStorageSync("addressId", addressId);
    if (outStock == 1) {
      showErrorToast("有部分商品缺货或已下架");
    } else if (numberChange == 1) {
      showErrorToast("部分商品库存有变动");
    }
  };
  const toSelectAddress = () => {
    Taro.navigateTo({
      url: "/pages/center/address?type=1",
    });
  };
  const offlineOrder = () => {};
  // TODO 有个bug，用户没选择地址，支付无法继续进行，在切换过token的情况下
  const submitOrder = () => {
    if (addressId <= 0) {
      showErrorToast("请选择收货地址");
      return false;
    }
    Taro.showLoading({
      title: "",
      mask: true,
    });
    let orderId = "1111";
    Taro.hideLoading();
    Taro.redirectTo({
      url: "/pages/payResult/index?status=1&orderId=" + orderId,
    });
    // fixme todo 支付迟点再做 先写页面
    // OrderSubmit({ addressId, postscript, freightPrice, offlinePay: 0 }).then(
    //   (res) => {
    //     Taro.removeStorageSync("orderId");
    //     Taro.setStorageSync("addressId", 0);
    //     const orderId = res.orderInfo.id;
    //     Taro.hideLoading();
    //   }
    // );
  };
  const bindinputMemo = (event) => {
    setPostscript(event.detail.value);
  };
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
              <Input
                type="text"
                className="memo"
                onInput={bindinputMemo}
                value={postscript}
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
