import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import receiver from "@/images/icon/receiver.png";
import mobile from "@/images/icon/mobile.png";
import position from "@/images/icon/position.png";
import addressPng from "@/images/icon/address.png";
import { Input, ScrollView, Switch } from "@tarojs/components";
import "./addressDetail.less";

const AddressDetail = () => {
  const [type, setType] = useState(0);
  const [address, setAddress] = useState<any>(null);
  const addressId = 1;
  const openSelectRegion = true;
  const selectRegionDone = true;
  const selectRegionList: any = [];
  const regionList: any = [];
  const regionType = 1;
  useEffect(() => {
    const $instance = Taro.getCurrentInstance();
    if ($instance?.router?.params!.type) {
      setType(Number($instance.router.params.type));
    }
  }, []);
  const saveAddress = () => {};
  const chooseRegion = () => {};
  const doneSelectRegion = () => {};
  const bindinputName = () => {};
  const mobilechange = () => {};
  const bindinputAddress = () => {};
  const cancelSelectRegion = () => {};
  const switchChange = () => {};
  const deleteAddress = () => {};
  const selectRegionType = () => {};
  const selectRegion = () => {};
  return (
    <>
      <div className="container">
        <div className="edit-container">
          <div className="a-item">
            <div className="icon">
              <img className="img" src={receiver}></img>
            </div>
            <div className="input-wrap">
              <Input
                cursorSpacing={100}
                className="a-input"
                onInput={bindinputName}
                placeholder="姓名"
                value={address.name}
              />
            </div>
          </div>
          <div className="a-item">
            <div className="icon">
              <img className="img" src={mobile}></img>
            </div>
            <div className="input-wrap">
              <Input
                cursorSpacing={100}
                className="a-input"
                type="number"
                onInput={mobilechange}
                value={address.mobile}
                placeholder="手机号码"
              />
            </div>
          </div>
          <div className="a-item">
            <div className="icon">
              <img className="img" src={position}></img>
            </div>
            <div className="input-wrap" onClick={chooseRegion}>
              <Input
                cursorSpacing={100}
                className="a-input"
                value={address.full_region}
                disabled
                placeholder="选择省份、城市、区县"
              />
              <div className="arrow"></div>
            </div>
          </div>
          <div className="a-item">
            <div className="icon">
              <img className="img" src={addressPng}></img>
            </div>
            <div className="input-wrap">
              <Input
                cursor-spacing="100"
                className="a-input"
                onInput={bindinputAddress}
                value={address.address}
                placeholder="详细地址, 如街道、小区或写字楼等"
              />
            </div>
          </div>
        </div>
        <div className="default-wrap">
          <div className="text">设为默认信息</div>
          <Switch
            className="switch"
            checked={address.is_default}
            onClick={switchChange}
          />
        </div>
        <div className="btn-wrap" onClick={saveAddress}>
          <div className="btn active">保存</div>
        </div>
        {addressId > 0 && (
          <div className="delete-wrap" onClick={deleteAddress}>
            <div className="btn">删除</div>
          </div>
        )}
        {openSelectRegion && (
          <div className="region-select">
            <div className="hd">
              <div className="region-selected">
                {selectRegionList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`item ${item.id == 0 ? "disabled" : ""} ${
                        regionType - 1 === index ? "selected" : ""
                      } `}
                      onClick={selectRegionType}
                      data-region-type-index={index}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
              <div
                className={`done ${selectRegionDone ? "" : "disabled"} `}
                onClick={doneSelectRegion}
              >
                确定
              </div>
            </div>
            <div className="bd">
              <ScrollView scrollY className="region-list">
                {regionList.map((item, index) => (
                  <div
                    key={item.id}
                    className={`item ${item.selected ? "selected" : ""}`}
                    onClick={() => selectRegion(index)}
                  >
                    {item.name}
                  </div>
                ))}
              </ScrollView>
            </div>
          </div>
        )}
      </div>
      {openSelectRegion && (
        <div className="bg-mask" onClick={cancelSelectRegion}></div>
      )}
    </>
  );
};

export default AddressDetail;
