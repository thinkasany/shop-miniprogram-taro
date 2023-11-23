import { useEffect, useState } from "react";
import { IndexUrl, ShowSettings } from "@/servers/index";
import Loading from "@/components";
import contactPng from "@/images/icon/contact.png";
import searchPng from "@/images/icon/search.png";
import { Swiper, SwiperItem, Image, Navigator } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.less";

const Index = () => {
  const [info, setInfo] = useState({});
  const [floorGoods, setFloorGoods] = useState<any[]>([]);
  const [banner, setBanner] = useState<any[]>([]);
  const [channel, setChannel] = useState<any[]>([]);
  const [notice, setNotice] = useState<any[]>([]);
  const [loading, setLoading] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [sysHeight, setSysHeight] = useState(20);
  const [showContact, setShowContact] = useState(1);
  const [showChannel, setShowChannel] = useState(1);
  const [showBanner, setShowBanner] = useState(1);
  const [indexBannerImg, setIndexBannerImg] = useState(1);
  const [showNotice, setShowNotice] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    // 在这里执行相当于小程序的onLoad逻辑
    getIndexData();
    getChannelShowInfo();

    // React的类似componentDidMount的逻辑
    return () => {
      setAutoplay(false);
    };
  }, []); // 传递一个空数组，表示只在组件挂载时执行

  useEffect(() => {
    // React的类似componentDidUpdate的逻辑
    // const info = localStorage.getItem("userInfo");
    // if (info) {
    //   setUserInfo(JSON.parse(info));
    // }
  }, [userInfo]);

  useEffect(() => {
    // 监听页面滚动事件
    const handleScroll = (e) => {
      let scrollTop = e.target.scrollTop;
      if (scrollTop >= 2000) {
        setShowContact(0);
      } else {
        setShowContact(1);
      }
    };

    // 添加滚动事件监听
    window.addEventListener("scroll", handleScroll);

    // 在组件销毁时移除滚动事件监听
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const getIndexData = async () => {
    // 模拟请求数据
    const data = await IndexUrl();
    console.log("data", data);

    setFloorGoods(data.categoryList);
    setBanner(data.banner);
    setChannel(data.channel);
    setNotice(data.notice);
    setLoading(1);

    // 更新购物车图标
    let cartGoodsCount = "";
    if (data.cartCount === 0) {
      localStorage.removeItem("cartCount");
    } else {
      cartGoodsCount = data.cartCount + "";
      localStorage.setItem("cartCount", cartGoodsCount);
    }
  };

  const getChannelShowInfo = async () => {
    const data = await ShowSettings();

    setChannel(data.channel);
    setBanner(data.banner);
    setNotice(data.notice);
    // setIndexBannerImg(data.index_banner_img);
  };

  const goCategory = (categoryId) => {
    Taro.setStorageSync("categoryId", categoryId);
    Taro.switchTab({
      url: "/pages/category/index",
    });
  };

  const goSearch = () => {
    Taro.navigateTo({
      url: "/pages/search/index",
    });
  };

  return loading === 1 ? (
    <div className="container">
      {showContact === 1 ? (
        <div className="contact-wrap">
          <button
            className="contact-btn"
            // session-from='{"nickName":"{{userInfo.nickname}}","avatarUrl":"{{userInfo.avatar}}"}'
            open-type="contact"
          >
            <img className="icon" src={contactPng}></img>
            <div className="text">客服</div>
          </button>
        </div>
      ) : null}
      <div className="search" onClick={goSearch}>
        <img className="icon" src={searchPng}></img>
        <text className="txt">搜索,发现更多好物</text>
      </div>
      {showBanner && banner.length ? (
        <div className="banner-wrap">
          <Swiper
            className="banner"
            indicatorDots
            autoplay={autoplay}
            interval={3000}
            duration={1000}
          >
            {banner.map((item) => (
              <SwiperItem key={item.id}>
                {item.link_type === 0 ? (
                  <Navigator url={`/pages/goods/goods?id=${item.goods_id}`}>
                    <Image src={item.image_url} mode="aspectFill" />
                  </Navigator>
                ) : (
                  <Navigator url={item.link}>
                    <Image src={item.image_url} mode="aspectFill" />
                  </Navigator>
                )}
              </SwiperItem>
            ))}
          </Swiper>
        </div>
      ) : null}
      {showNotice && notice.length ? (
        <div className="marquee_box">
          <Swiper
            vertical
            className="notice-swiper"
            indicatorDots={false}
            autoplay={autoplay}
            interval={2000}
            duration={1000}
          >
            {notice.map((item) => (
              <SwiperItem key={item.id} className="notice-wrap">
                <div className="icon">
                  <Image src="/images/icon/notice-icon.png" className="img" />
                </div>
                <div className="notice-text">{item.content}</div>
              </SwiperItem>
            ))}
          </Swiper>
        </div>
      ) : null}
      <Swiper
        className="catalog-wrap"
        indicatorDots={false}
        indicatorColor="#dedede"
        indicatorActiveColor="#e00000"
        style={{ display: showChannel ? "block" : "none" }}
      >
        {channel.map((item, index) => (
          <SwiperItem key={index} className="first">
            {index < 6 && (
              <div
                className="icon-navi"
                data-cateid={item.id}
                onClick={() => goCategory(item.id)}
              >
                <Image className="icon-img" src={item.icon_url} />
                <div className="icon-text">{item.name}</div>
              </div>
            )}
            {index >= 6 && index < 12 && (
              <Navigator
                url={`/pages/category/index?id=${item.id}`}
                className="icon-navi"
                hoverClass="none"
              >
                <Image className="icon-img" src={item.icon_url} />
                <div className="icon-text">{item.name}</div>
              </Navigator>
            )}
            {index >= 12 && (
              <Navigator
                url={`/pages/category/index?id=${item.id}`}
                className="icon-navi"
                hoverClass="none"
              >
                <Image className="icon-img" src={item.icon_url} />
                <div className="icon-text">{item.name}</div>
              </Navigator>
            )}
          </SwiperItem>
        ))}
      </Swiper>
      <div className="goods-container">
        {floorGoods.map((item, index) => (
          <div className="topic-container" key={item.id}>
            {indexBannerImg === 1 ? (
              <div
                className="banner-container"
                onClick={() => goCategory(item.id)}
                data-cateid={item.id}
              >
                <Image
                  mode="aspectFill"
                  style={{ width: "100%", height: `${item.height}rpx` }}
                  src={item.banner}
                ></Image>
                <div
                  className="bg"
                  style={{
                    height: `${item.height}rpx`,
                    lineHeight: `${item.height}rpx`,
                  }}
                ></div>
                <div
                  className="text"
                  style={{
                    height: `${item.height}rpx`,
                    lineHeight: `${item.height}rpx`,
                  }}
                >
                  {item.name}
                </div>
              </div>
            ) : (
              <div
                className="category-title"
                onClick={() => goCategory(item.id)}
                data-cateid={item.id}
              >
                <div className="title">
                  <div className="text">{item.name}</div>
                  <div className="line"></div>
                </div>
              </div>
            )}

            <div className="list-wrap">
              {item.goodsList.map((iitem, iindex) => (
                <div
                  className={`new-box ${
                    (iindex + 1) % 3 === 0 ? "no-margin" : ""
                  }`}
                  key={iindex}
                >
                  <Navigator
                    key={iitem.id}
                    hoverClass="none"
                    className="navi-url"
                    url={`/pages/goods/index?id=${iitem.id}`}
                  >
                    <div className="box">
                      <img src={iitem.list_pic_url} className="image">
                        {iitem.is_new === 1 && (
                          <div className="new-tag">新品</div>
                        )}
                      </img>
                      {iitem.goods_number <= 0 && (
                        <div className="sold-img">
                          <Image
                            className="soldout"
                            src="/images/icon/sold-out.png"
                          ></Image>
                        </div>
                      )}
                    </div>
                    <div
                      className={`goods-info ${
                        iitem.goods_number <= 0 ? "fast-out-status" : ""
                      }`}
                    >
                      <div className="goods-title">{iitem.name}</div>
                      <div className="price-container">
                        <div className="l">
                          <div className="h">￥{iitem.min_retail_price}</div>
                        </div>
                        {iitem.sell_volume > 0 && (
                          <div className="r">
                            <div className="t">{iitem.sell_volume}人买过</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Navigator>
                </div>
              ))}
            </div>

            <div
              className="more-category"
              onClick={() => goCategory(item.id)}
              data-cateid={item.id}
            >
              点击查看更多{item.name}
            </div>
          </div>
        ))}
      </div>
      <div className="no-more-goods ">没有更多商品啦</div>
    </div>
  ) : (
    <Loading height={sysHeight} />
  );
};

export default Index;
