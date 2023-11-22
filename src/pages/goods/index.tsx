/* eslint-disable react/jsx-key */
import imgIcon from "@/images/icon/img-icon.png";
import iconIndexB from "@/images/nav/icon-index-b.png";
import iconCartB from "@/images/nav/icon-cart-b.png";
import noImg from "@/images/icon/no-img.png";
import iconChat from "@/images/icon/chat.png";
import iconShare from "@/images/icon/share.png";
import iconClose from "@/images/icon/icon-close.png";
import iconPyq from "@/images/icon/pyq.png";
import iconWeixin from "@/images/icon/weixin.png";
import { useState } from "react";
import { Input, Swiper, SwiperItem } from "@tarojs/components";
import Loading from "../../components";

import "./index.less";

const Goods = () => {
  const [loading, setLoading] = useState(1);
  const [number, setNumber] = useState(1);
  const [goods, setGoods] = useState<any>({});
  const [checkedSpecText, setCheckedSpecText] = useState("");
  const [tmpSpecText, setTmpSpecText] = useState("");
  const [current, setCurrent] = useState(0);
  const [checkedSpecPrice, setCheckedSpecPrice] = useState(0);
  const [sysHeight, setSysHeight] = useState(20);
  const [gallery, setGallery] = useState<any>([]);
  const [priceChecked, setPriceChecked] = useState(false);
  const [cartGoodsCount, setCartGoodsCount] = useState(0);
  const [goodsNumber, setGoodsNumber] = useState(1);
  const [info, setInfo] = useState<any>({});
  const [productList, setProductList] = useState<any>([]);
  const [specificationList, setSpecificationList] = useState<any>([]);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const goIndexPage = () => {};
  const addToCart = () => {};
  const fastToCart = () => {};
  const shareTo = () => {};
  const predivImage = () => {};
  const clickSkuValue = () => {};
  const bindchange = () => {};
  const handleTap = () => {};
  const closeAttr = () => {};
  const openCartPage = () => {};
  const switchAttrPop = () => {};
  const goComment = () => {};
  const createShareImage = () => {};
  const hideDialog = () => {};
  const cutNumber = () => {};
  const addNumber = () => {};
  return (
    <div>
      {loading === 1 ? (
        <div className="container">
          <div className="banner-wrap">
            {!!gallery.length && (
              <div className="current-item">
                <div className="in-item">
                  <div className="current-mask"></div>
                  <div className="current-content">
                    <div className="icon">
                      <img className="img" src={imgIcon} />
                    </div>
                    <div className="num">
                      {current + 1}/{gallery.length}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {gallery.length > 0 ? (
              <div>
                <Swiper
                  onChange={bindchange}
                  className="banner banner-style1"
                  indicator-dots={false}
                  autoplay={false}
                  current={current}
                  circular
                  interval={3000}
                  duration={1000}
                  display-multiple-items="1"
                >
                  {gallery?.map((item) => {
                    return (
                      <SwiperItem className="item">
                        <img
                          onClick={predivImage}
                          data-src={item.img_url}
                          src={item.img_url}
                          className="slide-image"
                        />
                      </SwiperItem>
                    );
                  })}
                </Swiper>
              </div>
            ) : (
              <div>
                <div className="no-image">
                  <img className="img" src={noImg}></img>
                </div>
              </div>
            )}
          </div>
          <div className="price-info">
            <div className="l">
              <div className="now-price">
                <div className="sym">¥</div>
                <div className="num">{goods.retail_price}</div>
              </div>
            </div>
            <div className="r">
              <div className="sales">{goods.sell_volume}人买过</div>
            </div>
          </div>
          <div className="info-wrap">
            <div className="l">
              <div className="goods-title">{goods.name}</div>
              {/* <!-- <div className='goods-intro'>{{goods.goods_brief}}</div> --> */}
            </div>
            <div className="r">
              <div onClick={shareTo} className="share">
                <img className="icon" src={iconShare}></img>
                <div className="text">分享</div>
              </div>
            </div>
          </div>
          <div className="section-nav" onClick={switchAttrPop}>
            <div className="nav-box">
              <div className="t">
                选择
                <text className="tt">{checkedSpecText}</text>
              </div>
              <div className="arrow"></div>
            </div>
          </div>
          {info.comment && (
            <div className="comment">
              <div className="t">宝贝评价(99+)</div>
              <div className="r" onClick={goComment}>
                查看全部
              </div>
            </div>
          )}

          <div className="details-wrap">
            <div className="title">商品详情</div>
            <div className="show">
              <div className="details-image-wrap">
                {/* <import src="../../lib/wxParse/wxParse.wxml" /> */}
                {/* <template is="wxParse" data="{{wxParseData:goodsDetail.nodes}}" /> */}
              </div>
            </div>
          </div>
          <div className="attr-pop-box" onClick={closeAttr}>
            <div className="attr-pop" onClick={handleTap}>
              <div className="close" onClick={closeAttr}>
                <img className="icon" src={iconClose} />
              </div>
              <div className="img-info">
                <div className="img-wrap">
                  <img className="img" src={gallery[0]?.img_url} />
                </div>
                <div className="info">
                  {!priceChecked ? (
                    <div className="price-range">
                      {/* <!-- todo 原价不等于0的时候要补充 --> */}
                      <div className="retail-price">
                        <div className="g-price">¥{goods.retail_price}</div>
                      </div>
                      <div className="retail-price">
                        <div className="p-title">库存:</div>
                        <div className="n-num">{goodsNumber}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="price-range">
                      <div className="retail-price">
                        <div className="g-price">¥{checkedSpecPrice}</div>
                      </div>
                      <div className="retail-price">
                        <div className="p-title">库存:</div>
                        <div className="n-num">{goodsNumber}</div>
                      </div>
                    </div>
                  )}
                  {!!productList.length && (
                    <div className="a">{tmpSpecText}</div>
                  )}
                </div>
              </div>
              <div className="spec-con">
                <div className="spec-item">
                  <div className="name">{specificationList.name}</div>
                  <div className="values">
                    {specificationList?.valueList?.map((item, index) => {
                      return (
                        <div
                          className="value {{item.checked ? 'selected' : ''}} {{item.goods_number <=0?'out-stock':''}}"
                          onClick={clickSkuValue}
                          data-value-id={item.id}
                          data-index={index}
                          data-name-id={item.specification_id}
                        >
                          {item.value}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="number-item">
                  <div className="name">数量 ({goods.goods_unit})</div>
                  <div className="selnum">
                    <div className="cut" onClick={cutNumber}>
                      -
                    </div>
                    <Input
                      value={number.toString()}
                      className="number"
                      type="number"
                      cursor-spacing="100"
                      // bindblur="inputNumber"
                    />
                    <div className="add" onClick={addNumber}>
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cart-add-box">
            <div className="l">
              <div className="left-icon form-button" onClick={goIndexPage}>
                <form report-submit="true">
                  <button
                    onClick={goIndexPage}
                    className="index-btn"
                    hover-className="none"
                  >
                    <img className="icon" src={iconIndexB} />
                    <div className="icon-text">主页</div>
                  </button>
                </form>
              </div>
              <button
                className="left-icon contact-button"
                session-from='{"nickName":"{{userInfo.nickname}}","avatarUrl":"{{userInfo.avatar}}"}'
                open-type="contact"
                show-message-card="true"
                hover-className="none"
              >
                <img className="icon" src={iconChat} />
                <div className="icon-text">客服</div>
              </button>
              <div className="left-icon" onClick={openCartPage}>
                <text className="cart-count">{cartGoodsCount}</text>
                <img className="icon" src={iconCartB} />
                <div className="icon-text">购物车</div>
              </div>
            </div>
            {goods.goods_number > 0 && goods.is_on_sale == 1 && (
              <div>
                {goodsNumber > 0 ? (
                  <div>
                    <div className="to-cart-btn" onClick={addToCart}>
                      加入购物车
                    </div>
                    <div className="to-pay-btn" onClick={fastToCart}>
                      立即购买
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="cart-empty">商品已售罄</div>
                  </div>
                )}
              </div>
            )}
            {goods.goods_number <= 0 && (
              <div>
                <div className="cart-empty">商品已售罄</div>
              </div>
            )}
            {goods.is_on_sale == 0 && (
              <div>
                <div className="cart-empty">商品已下架</div>
              </div>
            )}
          </div>
          <div className={`dialog ${showShareDialog ? "dialog_show" : ""}`}>
            <div className="dialog-mask2" onClick={hideDialog}></div>
            <div className="dialog-fixed dialog-share">
              <div className="share-wrap">
                <div className="content">
                  <div className="share-block">
                    <button
                      className="block share-btn"
                      hover-className="none"
                      open-type="share"
                    >
                      <img className="img" src={iconWeixin} />
                      <div className="text">发给好友/发到微信群</div>
                    </button>
                    <div className="block" onClick={createShareImage}>
                      <img className="img" src={iconPyq} />
                      <div className="text">保存分享图发朋友圈</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cancel" onClick={hideDialog}>
                取消
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading height={sysHeight} />
      )}
    </div>
  );
};

export default Goods;
