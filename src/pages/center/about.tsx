import Taro from "@tarojs/taro";
import { useState } from "react";
import "./about.less";

const About = () => {
  const [info, setInfo] = useState<any>({});
  Taro.useDidShow(() => {
    const globalData = Taro.getStorageSync("globalData");
    setInfo(globalData.info);
  });
  return (
    <div className="container">
      <div className="about-wrap">
        <div className="title">{info.title}</div>
      </div>
    </div>
  );
};

export default About;
