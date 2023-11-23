/* eslint-disable react/jsx-key */
import loadingGif from "@/images/icon/loading.gif";
import { Navigator, ScrollView, Image } from "@tarojs/components";
import searchPng from "@/images/icon/search.png";
import soldOutPng from "@/images/icon/sold-out.png";
import { useState } from "react";
import {
  ShowSettings,
  CatalogList,
  GoodsCount,
  GetCurrentList,
  CatalogCurrent,
} from "@/servers";
import Taro from "@tarojs/taro";
import "./index.less";

const Index = () => {
  const [loading, setLoading] = useState(0);
  const [goodsCount, setGoodsCount] = useState(0);
  const [showNoMore, setShowNoMore] = useState(0);
  const [nowId, setNowId] = useState(0);
  const [index_banner_img, setIndex_banner_img] = useState(0);
  const [list, setList] = useState<any[]>([]);
  const [navList, setNavList] = useState<any[]>([]);
  const [currentCategory, setCurrentCategory] = useState<any>({});
  const allPage = 1;
  const size = 8;
  Taro.useDidShow(() => {
    getChannelShowInfo();
    getCatalog();
    getCurrentList(0);
  });
  const getCatalog = async () => {
    const list = await CatalogList();
    setNavList(list.categoryList);
    const res = await GoodsCount();
    setGoodsCount(res.goodsCount);
  };
  const switchCate = (e) => {
    let id = e.currentTarget.dataset.id;
    if (id == nowId) {
      return false;
    } else {
      setLoading(1);
      if (id === 0) {
        setCurrentCategory({});
      } else {
        getCurrentList(id);
        getCurrentCategory(id);
      }
      Taro.setStorageSync("categoryId", id);
      setNowId(Number(id));
      setLoading(0);
    }
  };
  const getCurrentList = (id) => {
    GetCurrentList({ size, page: allPage, id }).then((res) => {
      setList([...res.data]);
    });
  };
  const getCurrentCategory = (id) => {
    CatalogCurrent({ id }).then((res) => {
      setCurrentCategory(res);
    });
  };
  const onBottom = () => {};
  const getChannelShowInfo = async () => {
    const res = await ShowSettings();
    setIndex_banner_img(res.index_banner_img);
  };

  return (
    <div className="container">
      <div className="search">
        <Navigator url="/pages/search/index" className="input">
          <img className="icon" src={searchPng}></img>
          <span className="txt">搜索, 共{goodsCount}款好味</span>
        </Navigator>
      </div>
      <div className="catalog">
        <ScrollView className="nav" scroll-y="true">
          <div
            className={`item ${nowId === 0 ? "active" : ""}`}
            onClick={switchCate}
            data-id="0"
          >
            全部
          </div>
          {navList.map((item) => {
            return (
              <div
                className={`item ${nowId == item.id ? "active" : ""}`}
                data-id={item.id}
                onClick={switchCate}
              >
                {item.name}
              </div>
            );
          })}
        </ScrollView>
        <ScrollView className="cate" scroll-y="true" onScrollToLower={onBottom}>
          {loading === 0 ? (
            <div>
              {nowId !== 0 && index_banner_img == 1 && (
                <div className="banner-container">
                  <Image
                    mode="aspectFill"
                    style={{
                      width: "100%",
                      height: `${currentCategory.p_height}rpx`,
                    }}
                    src={currentCategory.img_url}
                  />
                  <div
                    className="bg"
                    style={{
                      height: `${currentCategory.p_height}rpx`,
                      lineHeight: `${currentCategory.p_height}rpx`,
                    }}
                  ></div>
                  <div
                    className="text"
                    style={{
                      height: `${currentCategory.p_height}rpx`,
                      lineHeight: `${currentCategory.p_height}rpx`,
                    }}
                  >
                    {currentCategory.name}
                  </div>
                </div>
              )}

              <div className="list-wrap clearfix">
                {list.map((item) => {
                  return (
                    <div className="goods-box {{(index+1)%2 == 0?'no-margin':''}}">
                      <Navigator
                        hover-className="none"
                        className="navi-url"
                        url={`/pages/goods/index?id=${item.id}`}
                      >
                        <div className="box">
                          <img src={item.list_pic_url} className="image">
                            {item.is_new == 1 && (
                              <div className="new-tag">新品</div>
                            )}
                          </img>
                          {item.goods_number <= 0 && (
                            <div>
                              <div className="sold-img">
                                <img className="soldout" src={soldOutPng}></img>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="goods-info {{item.goods_number <= 0?'fast-out-status':''}}">
                          <div className="goods-title">{item.name}</div>
                          <div className="goods-intro">{item.goods_brief}</div>
                          <div className="price-container">
                            <div className="l">
                              <div className="h">￥{item.min_retail_price}</div>
                            </div>
                          </div>
                        </div>
                      </Navigator>
                    </div>
                  );
                })}
              </div>
              {showNoMore === 1 ? (
                <div className="show-more" onClick={onBottom}>
                  加载更多
                </div>
              ) : (
                <div className="no-more">没有更多商品了</div>
              )}
            </div>
          ) : (
            <div>
              <div className="loading-wrap">
                <img className="img" src={loadingGif}></img>
                <div className="text">正在加载...</div>
              </div>
            </div>
          )}
        </ScrollView>
      </div>
    </div>
  );
};

export default Index;
