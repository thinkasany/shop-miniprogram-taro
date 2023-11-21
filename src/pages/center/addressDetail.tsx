import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import receiver from "@/images/icon/receiver.png";
import mobile from "@/images/icon/mobile.png";
import position from "@/images/icon/position.png";
import addressPng from "@/images/icon/address.png";
import { Input, ScrollView, Switch } from "@tarojs/components";
import { getAddressDetail, RegionList, SaveAddress } from "@/servers";
import { showErrorToast, testMobile } from "@/utils";
import "./addressDetail.less";

const defaultSelectRegionList = [
  {
    id: 0,
    name: "省份",
    parent_id: 1,
    type: 1,
  },
  {
    id: 0,
    name: "城市",
    parent_id: 1,
    type: 2,
  },
  {
    id: 0,
    name: "区县",
    parent_id: 1,
    type: 3,
  },
];
const defaultAddress = {
  id: 0,
  province_id: 0,
  city_id: 0,
  district_id: 0,
  address: "",
  full_region: "",
  name: "",
  mobile: "",
  is_default: 0,
};
const AddressDetail = () => {
  const [address, setAddress] = useState<any>(defaultAddress);
  const [openSelectRegion, setOpenSelectRegion] = useState(false);
  const [addressId, setAddressId] = useState(1);
  const [regionList, setRegionList] = useState<any[]>([]);
  const [regionType, setRegionType] = useState(1);
  const [selectRegionDone, setSelectRegionDone] = useState(false);
  const [selectRegionList, setSelectRegionList] = useState<any[]>(
    defaultSelectRegionList
  );

  useEffect(() => {
    const $instance = Taro.getCurrentInstance();
    if ($instance?.router?.params.id) {
      const id = Number($instance.router.params.id);
      setAddressId(id);
      getAddressDetail({ id }).then((res) => {
        setAddress(res);
      });
    }
    getRegionList(1);
  }, []);

  Taro.useDidShow(() => {
    Taro.setNavigationBarTitle({
      title: addressId > 0 ? "编辑收货信息" : "新增收货信息",
    });
  });

  const getRegionList = async (regionId) => {
    const res = await RegionList({ parentId: regionId });
    const regionList = res.map((item) => {
      //标记已选择的
      if (
        regionType == item.type &&
        selectRegionList[regionType - 1].id == item.id
      ) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    setRegionList(regionList);
  };
  const saveAddress = () => {
    if (address.name == "" || address.name == undefined) {
      showErrorToast("请输入姓名");
      return false;
    }
    if (address.mobile == "" || address.mobile == undefined) {
      showErrorToast("请输入手机号码");
      return false;
    }
    if (address.district_id == 0 || address.district_id == undefined) {
      showErrorToast("请输入省市区");
      return false;
    }
    if (address.address == "" || address.address == undefined) {
      showErrorToast("请输入详细地址");
      return false;
    }
    SaveAddress({
      id: address.id,
      name: address.name,
      mobile: address.mobile,
      province_id: address.province_id,
      city_id: address.city_id,
      district_id: address.district_id,
      address: address.address,
      is_default: address.is_default,
    }).then(() => {
      Taro.navigateBack();
    });
  };
  const chooseRegion = () => {
    setOpenSelectRegion(true);
    if (
      address.province_id > 0 &&
      address.city_id > 0 &&
      address.district_id > 0
    ) {
      selectRegionList[0].id = address.province_id;
      selectRegionList[0].name = address.province_name;
      selectRegionList[0].parent_id = 1;

      selectRegionList[1].id = address.city_id;
      selectRegionList[1].name = address.city_name;
      selectRegionList[1].parent_id = address.province_id;

      selectRegionList[2].id = address.district_id;
      selectRegionList[2].name = address.district_name;
      selectRegionList[2].parent_id = address.city_id;
      setSelectRegionList(selectRegionList);
      setRegionType(3);
      getRegionList(address.city_id);
    } else {
      setSelectRegionList([
        {
          id: 0,
          name: "省份",
          parent_id: 1,
          type: 1,
        },
        {
          id: 0,
          name: "城市",
          parent_id: 1,
          type: 2,
        },
        {
          id: 0,
          name: "区县",
          parent_id: 1,
          type: 3,
        },
      ]);
      setRegionType(1);
      getRegionList(1);
    }
    setRegionDoneStatus();
  };
  const setRegionDoneStatus = () => {
    const doneStatus = selectRegionList.every((item) => item.id !== 0);
    setSelectRegionDone(doneStatus);
  };
  const doneSelectRegion = () => {
    if (!selectRegionDone) {
      return false;
    }
    address.province_id = selectRegionList[0].id;
    address.city_id = selectRegionList[1].id;
    address.district_id = selectRegionList[2].id;
    address.province_name = selectRegionList[0].name;
    address.city_name = selectRegionList[1].name;
    address.district_name = selectRegionList[2].name;
    address.full_region = selectRegionList
      .map((item) => {
        return item.name;
      })
      .join("");
    setAddress(address);
    setOpenSelectRegion(false);
  };
  const bindinputName = (e) => {
    const name = e.detail.value;
    setAddress({ ...address, name });
  };
  const mobilechange = (e) => {
    const mobile = e.detail.value;
    testMobile(mobile);
    setAddress({ ...address, mobile });
  };
  const bindinputAddress = (e) => {
    const $address = e.detail.value;
    setAddress({ ...address, address: $address });
  };
  const cancelSelectRegion = () => {};
  const switchChange = (e) => {
    const status = e.detail.value;
    let is_default = 0;
    if (status === true) {
      is_default = 1;
    }
    setAddress({ ...address, is_default });
  };
  const deleteAddress = () => {};
  const selectRegionType = (event) => {
    const regionTypeIndex = event.target.dataset.regionTypeIndex;

    //判断是否可点击
    if (
      regionTypeIndex + 1 == regionType ||
      (regionTypeIndex - 1 >= 0 &&
        selectRegionList[regionTypeIndex - 1].id <= 0)
    ) {
      return false;
    }
    setRegionType(regionTypeIndex + 1);
    const selectRegionItem = selectRegionList[regionTypeIndex];
    getRegionList(selectRegionItem.parent_id);
    setRegionDoneStatus();
  };
  const selectRegion = (index) => {
    let regionIndex = index;
    let regionItem = regionList[regionIndex];
    let regionType = regionItem.type;
    selectRegionList[regionType - 1] = regionItem;

    if (regionType != 3) {
      setSelectRegionList(selectRegionList);
      setRegionType(regionType + 1);
      getRegionList(regionItem.id);
    } else {
      setSelectRegionList(selectRegionList);
    }

    //重置下级区域为空
    selectRegionList.map((item, index) => {
      if (index > regionType - 1) {
        item.id = 0;
        item.name = index == 1 ? "城市" : "区县";
        item.parent_id = 0;
      }
      return item;
    });

    setSelectRegionList(selectRegionList);

    setRegionList(
      regionList.map((item) => {
        //标记已选择的
        if (
          regionType == item.type &&
          selectRegionList[regionType - 1].id == item.id
        ) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      })
    );

    setRegionDoneStatus();
  };
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
                value={address?.name}
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
                value={address?.mobile}
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
                value={address?.full_region}
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
                value={address?.address}
                placeholder="详细地址, 如街道、小区或写字楼等"
              />
            </div>
          </div>
        </div>
        <div className="default-wrap">
          <div className="text">设为默认信息</div>
          <Switch
            className="switch"
            checked={address?.is_default}
            onChange={switchChange}
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
