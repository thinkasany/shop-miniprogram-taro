/* eslint-disable react/jsx-key */
import cartEmptyPng from "@/images/icon/cart-empty.png";
import gouGrayPng from "@/images/icon/gou-gray.png";
import gouRedPng from "@/images/icon/gou-red.png";
import { Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { CartGoodsCount, CartList } from "@/servers";
import "./index.less";

const defaultCartTotal = {
  goodsCount: 0,
  goodsAmount: 0.0,
  checkedGoodsCount: 0,
  checkedGoodsAmount: 0.0,
  userId_test: "",
};
const Index = () => {
  const [checkedAllStatus, setCheckedAllStatus] = useState(true);
  const [cartGoods, setCartGoods] = useState<any>([]);
  const [cartTotal, setCartTotal] = useState(defaultCartTotal);
  const [hasCartGoods, setHasCartGoods] = useState(0);

  Taro.useDidShow(() => {
    getCartList();
    getCartNum();
  });
  const getCartNum = async () => {
    const res = await CartGoodsCount();
    const count = res.cartTotal.goodsCount;
    if (count === 0) {
      Taro.removeTabBarBadge({ index: 2 });
    } else {
      Taro.setTabBarBadge({ index: 2, text: String(count) });
    }
  };
  const getCartList = async () => {
    const res = await CartList();
    console.log("res", res);
  };
  const checkoutOrder = () => {};
  const checkedAll = () => {};
  const toIndexPage = () => {
    Taro.switchTab({
      url: "/pages/index/index",
    });
  };
  const goGoodsDetail = () => {};
  const deleteGoods = () => {};
  const addNumber = () => {};
  const cutNumber = () => {};
  const checkedItem = () => {};
  return (
    <div className="container">
      {!!cartGoods.length && (
        <div className="goodsList">
          {cartGoods.map((item, index) => {
            return (
              <div
                className={`a-goods ${
                  item.isTouchMove ? "touch-move-active" : ""
                }`}
                // bindtouchstart="touchstart"
                // bindtouchmove="touchmove"
                data-index={index}
              >
                <div className="content">
                  {item.number > 0 && item.is_on_sale == 1 && (
                    <div
                      className="checkbox"
                      onClick={checkedItem}
                      data-item-index="{{index}}"
                    >
                      {item.checked == 1 ? (
                        <img className="checkbox-img" src={gouRedPng} />
                      ) : (
                        <img className="checkbox-img" src={gouGrayPng} />
                      )}
                    </div>
                  )}

                  <div className="goods-info">
                    <div className="goods-url">
                      <div
                        className="img-box"
                        onClick={goGoodsDetail}
                        data-goodsid={item.goods_id}
                      >
                        <img src={item.list_pic_url} className="img" />
                      </div>
                      <div className="text-box">
                        <div
                          className={`${
                            item.number > 0 && item.is_on_sale == 1
                              ? "goods-title"
                              : "out-stock-title"
                          }`}
                        >
                          {item.goods_name}
                        </div>
                        <div className="goods-label">
                          {item.goods_specifition_name_value}
                        </div>
                        <div className="goods-price">
                          <div className="price-now">￥{item.retail_price}</div>
                        </div>
                        {item.number > 0 && item.is_on_sale == 1 ? (
                          <div className="selnum">
                            <div
                              data-item-index="{{index}}"
                              className="cut"
                              onClick={cutNumber}
                            >
                              -
                            </div>
                            <Input
                              value={item.number}
                              className="number"
                              disabled
                              type="number"
                            />
                            <div
                              data-item-index="{{index}}"
                              className="add"
                              onClick={addNumber}
                              // disabled="{{disabled}}"
                            >
                              +
                            </div>
                          </div>
                        ) : (
                          <div className="out-stock">暂时缺货</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="delete-btn"
                  data-item-index="{{index}}"
                  onClick={deleteGoods}
                >
                  删除
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className={`cart-empty-container ${hasCartGoods == 0 ? "show" : ""}`}
      >
        <div className="cart-empty-div">
          <img className="cart-empty" src={cartEmptyPng} />
        </div>
        <div className="cart-empty-txt">车里什么都没有，快去买一点吧</div>
        <div className="to-index-btn" onClick={toIndexPage}>
          去逛逛
        </div>
      </div>
      {!!cartGoods.length && (
        <div className="settle-box">
          <div className="left-price">
            <div className="all-selected" onClick={checkedAll}>
              {checkedAllStatus ? (
                <img className="checkbox" src={gouRedPng} />
              ) : (
                <img className="checkbox" src={gouGrayPng} />
              )}
              <div className="text">全选({cartTotal.checkedGoodsCount})</div>
            </div>
            <div className="total">合计：¥{cartTotal.checkedGoodsAmount}</div>
          </div>
          <div className="to-pay-btn" onClick={checkoutOrder}>
            去结算
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
