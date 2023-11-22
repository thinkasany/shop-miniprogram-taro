/* eslint-disable react/jsx-key */
import cartEmptyPng from "@/images/icon/cart-empty.png";
import gouGrayPng from "@/images/icon/gou-gray.png";
import gouRedPng from "@/images/icon/gou-red.png";
import { Input } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useState } from "react";
import {
  CartGoodsCount,
  CartList,
  CartUpdate,
  CartChecked,
  CartDelete,
} from "@/servers";
import { loginNow, showErrorToast } from "@/utils";
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
  const [hasCartGoods, setHasCartGoods] = useState(false);
  const [isEditCart, setIsEditCart] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

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
    const { cartList, cartTotal } = res;
    setHasCartGoods(!!cartList.length);
    setCartTotal(cartTotal);
    setCartGoods(cartList);
    setCheckedAllStatus(isCheckedAll());
  };
  //判断购物车商品已全选
  const isCheckedAll = () => {
    return cartGoods.every((element) => {
      if (element.checked === true) {
        return true;
      } else {
        return false;
      }
    });
  };
  const checkoutOrder = () => {
    //获取已选择的商品
    loginNow();
    const checkedGoods = cartGoods.filter((item) => item.checked);
    if (checkedGoods.length <= 0) {
      showErrorToast("你好像没选中商品");
      return false;
    }
    Taro.navigateTo({
      url: "/pages/order-check/index?addtype=0",
    });
  };
  const checkedAll = async () => {
    if (!isEditCart) {
      const productIds = cartGoods.map((v) => v.product_id);
      const res = await CartChecked({
        productIds: productIds.join(","),
        isChecked: isCheckedAll() ? 0 : 1,
      });
      setCartGoods(res.cartList);
      setCartTotal(res.cartTotal);
      setCheckedAllStatus(isCheckedAll());
    } else {
      //编辑状态
      const checkedAllStatus = isCheckedAll();
      const tmpCartData = cartGoods.map((v) => {
        v.checked = !checkedAllStatus;
        return v;
      });
      getCheckedGoodsCount();
      setCartGoods(tmpCartData);
      setCheckedAllStatus(isCheckedAll());
    }
  };
  const getCheckedGoodsCount = () => {
    let checkedGoodsCount = 0;
    let checkedGoodsAmount = 0;

    cartGoods.forEach((v) => {
      if (v.checked == true) {
        checkedGoodsCount += v.number;
        checkedGoodsAmount += v.number * v.retail_price;
      }
    });
    setCartTotal({ ...cartTotal, checkedGoodsCount, checkedGoodsAmount });
  };
  const touchstart = (e) => {
    const current = cartGoods.forEach((v, i) => {
      if (v.isTouchMove) {
        //只操作为true的
        v.isTouchMove = false;
      }
    });
    setStartX(e.changedTouches[0].clientX);
    setStartY(e.changedTouches[0].clientY);
    setCartGoods([...current]);
  };
  const toIndexPage = () => {
    Taro.switchTab({
      url: "/pages/index/index",
    });
  };
  const goGoodsDetail = (e) => {
    const goodsId = e.currentTarget.dataset.goodsid;
    Taro.navigateTo({
      url: "/pages/goods/index?id=" + goodsId,
    });
  };
  const deleteGoods = async (e) => {
    const itemIndex = e.currentTarget.dataset.itemIndex;
    const productIds = cartGoods[itemIndex].product_id;
    const res = await CartDelete({ productIds });
    setCartGoods(res.cartList);
    setCartTotal(res.cartTotal);
    getCartList();
    getCartNum();
    setCheckedAllStatus(isCheckedAll());
  };
  const addNumber = async (event) => {
    const itemIndex = event.target.dataset.itemIndex;
    const cartItem = cartGoods[itemIndex];
    const number = Number(cartItem.number) + 1;
    await updateCart(itemIndex, cartItem.product_id, number, cartItem.id);
  };
  const updateCart = async (itemIndex, productId, number, id) => {
    Taro.showLoading({
      title: "",
      mask: true,
    });
    try {
      const res = await CartUpdate({ productId, number, id });
      setCartTotal(res.cartTotal);
      setCartGoods(res.cartList);
      getCartNum();
    } catch (error) {
      console.log("error", error);
      showErrorToast("库存不足了");
    }
    Taro.hideLoading({});
  };
  const cutNumber = (event) => {
    const itemIndex = event.target.dataset.itemIndex;
    const cartItem = cartGoods[itemIndex];
    if (cartItem.number - 1 == 0) {
      showErrorToast("删除左滑试试");
      return;
    }
    const number = cartItem.number - 1 > 1 ? cartItem.number - 1 : 1;
    updateCart(itemIndex, cartItem.product_id, number, cartItem.id);
  };
  const checkedItem = async (e) => {
    const itemIndex = e.currentTarget.dataset.itemIndex;
    if (isEditCart) {
      const res = await CartChecked({
        productIds: cartGoods[itemIndex].product_id,
        isChecked: cartGoods[itemIndex].checked ? 0 : 1,
      });
      setCartGoods(res.cartList);
      setCartTotal(res.cartTotal);
      setCheckedAllStatus(isCheckedAll());
    } else {
      const tmpCartData = cartGoods.map((item, index) => {
        if (index === itemIndex) {
          item.checked = !item.checked;
        }
        return item;
      });
      getCheckedGoodsCount();
      setCartGoods(tmpCartData);
      setCheckedAllStatus(isCheckedAll());
    }
  };
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  const toAngle = (start, end) => {
    const _X = end.X - start.X,
      _Y = end.Y - start.Y;
    //返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
  };
  //滑动事件处理
  const touchmove = (e) => {
    const index = e.currentTarget.dataset.index; //当前索引
    const touchMoveX = e.changedTouches[0].clientX; //滑动变化坐标
    const touchMoveY = e.changedTouches[0].clientY; //滑动变化坐标
    //获取滑动角度
    const angle = toAngle(
      {
        X: startX,
        Y: startY,
      },
      {
        X: touchMoveX,
        Y: touchMoveY,
      }
    );
    const currentCartGoods = cartGoods.map((v, i) => {
      v.isTouchMove = false;
      //滑动超过30度角 return
      // if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) {
          //右滑
          v.isTouchMove = false;
        } else {
          //左滑
          v.isTouchMove = true;
        }
      }
      return v;
    });
    //更新数据

    setCartGoods([...currentCartGoods]);
  };

  return (
    <div className="container">
      {!!cartGoods.length ? (
        <div className="goodsList">
          {cartGoods.map((item, index) => {
            return (
              <div
                className={`a-goods ${
                  item.isTouchMove ? "touch-move-active" : ""
                }`}
                onTouchStart={touchstart}
                onTouchMove={touchmove}
                data-index={index}
              >
                <div className="content">
                  {item.number > 0 && item.is_on_sale == 1 && (
                    <div
                      className="checkbox"
                      onClick={checkedItem}
                      data-item-index={index}
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
                              data-item-index={index}
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
                              data-item-index={index}
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
                  data-item-index={index}
                  onClick={deleteGoods}
                >
                  删除
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={`cart-empty-container ${hasCartGoods ? "show" : ""}`}>
          <div className="cart-empty-div">
            <img className="cart-empty" src={cartEmptyPng} />
          </div>
          <div className="cart-empty-txt">车里什么都没有，快去买一点吧</div>
          <div className="to-index-btn" onClick={toIndexPage}>
            去逛逛
          </div>
        </div>
      )}

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
