import receiverPng from "@/images/icon/receiver.png";
import mobilePng from "@/images/icon/mobile.png";
import { useState } from "react";
import { Input } from "@tarojs/components";
import { showErrorToast, testMobile } from "@/utils";
import { SaveSettings, SettingsDetail } from "@/servers";
import Taro from "@tarojs/taro";
import "./setting.less";

const Setting = () => {
  const [status, setStatus] = useState(0);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  Taro.useDidShow(() => {
    SettingsDetail().then((res) => {
      setMobile(res.mobile);
      setName(res.name);
      setStatus(1);
    });
  });
  const bindinputName = (e) => {
    setName(e.detail.value);
  };
  const mobilechange = (e) => {
    setStatus(0);
    setMobile(e.detail.value);
    if (testMobile(e.detail.value)) {
      setStatus(1);
    }
  };
  const saveInfo = () => {
    if (name === "") {
      showErrorToast("请输入姓名");
      return false;
    }
    if (mobile === "") {
      showErrorToast("请输入手机号码");
      return false;
    }
    SaveSettings({ name, mobile }).then(() => {
      showErrorToast("保存成功");
      Taro.navigateBack();
    });
  };
  return (
    <div className="container">
      <div className="edit-container">
        <div className="a-item">
          <img className="icon" src={receiverPng} />
          <Input
            className="a-input"
            onInput={bindinputName}
            placeholder="真实姓名"
            value={name}
          />
        </div>
        <div className="a-item">
          <img className="icon" src={mobilePng} />
          <Input
            className="a-input"
            onInput={mobilechange}
            value={mobile}
            placeholder="手机号码"
          />
        </div>
      </div>
      <div className="wrap-btn">
        {status === 0 ? (
          <div className="btn-wrap disable">保存</div>
        ) : (
          <div className="btn-wrap active" onClick={saveInfo}>
            保存
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
