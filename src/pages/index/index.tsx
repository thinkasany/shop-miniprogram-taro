import { useEffect, useState } from "react";
import loadingGIF from "../../images/icon/loading.gif";
import { IndexUrl } from "@/servers/index";
import "./index.less";

const Index = () => {
  const [info, setInfo] = useState({});
  const [floorGoods, setFloorGoods] = useState([]);
  const [banner, setBanner] = useState([]);
  const [channel, setChannel] = useState([]);
  const [notice, setNotice] = useState([]);
  const [loading, setLoading] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [sysHeight, setSysHeight] = useState(20);
  const [showContact, setShowContact] = useState(1);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    // 在这里执行相当于小程序的onLoad逻辑
    getIndexData();
    // getChannelShowInfo();

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

  const getIndexData = async () => {
    try {
      // 模拟请求数据
      const data = await IndexUrl();
      console.log(data);

      if (data.errno === 0) {
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
      }
    } catch (error) {
      console.error("Error fetching index data:", error);
    }
  };

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

  return loading === 1 ? (
    <div> hello world</div>
  ) : (
    <div className="loading">
      <img
        className="img"
        src={loadingGIF}
        alt="loading"
        style={{ height: sysHeight }}
      />
      <div className="text">大风吹啊吹</div>
    </div>
  );
};

export default Index;
