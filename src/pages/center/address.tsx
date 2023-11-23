/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import positionDeny from "@/images/icon/position-deny.png";
import gouRed from "@/images/icon/gou-red.png";
import gouGray from "@/images/icon/gou-gray.png";
import editIcon from "@//images/icon/edit.png";
import Taro from "@tarojs/taro";
import { GetAddresses } from "@/servers";
import "./address.less";

const Address = () => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [type, setType] = useState(0);
  const [nowAddress, setNowAddress] = useState(0);
  useEffect(() => {
    const $instance = Taro.getCurrentInstance();
    if ($instance?.router?.params!.type) {
      setType(Number($instance.router.params.type));
    }
  }, []);
  Taro.useDidShow(async () => {
    const data = await GetAddresses();
    setAddresses(data);
    const addressId = Taro.getStorageSync("addressId");
    setNowAddress(addressId ? Taro.getStorageSync("addressId") : 0);
  });

  const addAddress = () => {};
  const goAddressDetail = (e) => {
    const id = e.currentTarget.dataset.addressid;
    Taro.navigateTo({
      url: "/pages/center/addressDetail?id=" + id,
    });
  };

  const selectAddress = (e) => {
    const addressId = e.currentTarget.dataset.addressid;
    Taro.setStorageSync("addressId", addressId);
    Taro.navigateBack();
  };

  return (
    <div className="container">
      {addresses.length ? (
        <div className="has-info">
          {addresses.map((item) => {
            return (
              <div
                onClick={type === 0 ? goAddressDetail : selectAddress}
                className="info-item"
                data-addressid={item.id}
              >
                {type === 1 ? (
                  <div className="selected">
                    {item.id == nowAddress ? (
                      <img className="img" src={gouRed}></img>
                    ) : (
                      <img className="img" src={gouGray}></img>
                    )}
                  </div>
                ) : null}

                <div className="info-wrap">
                  <div className="addr">
                    <div className="top">{item.address}</div>
                    <div className="text">{item.full_region}</div>
                  </div>
                  <div className="name">
                    <div className="text">
                      {item.name} {item.mobile}
                    </div>
                    {item.is_default ? (
                      <div className="default">默认</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className="edit-wrap"
                  data-addressid={item.id}
                  onClick={goAddressDetail}
                >
                  <img className="img" src={editIcon}></img>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="no-info">
          <img src={positionDeny} className="img"></img>
          <div className="text">没有收货信息</div>
        </div>
      )}

      <div className="btn-wrap" onClick={addAddress}>
        <div className="btn">新增收货信息</div>
      </div>
    </div>
  );
};

export default Address;
