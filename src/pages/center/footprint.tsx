/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import footprintPng from "@/images/icon/footprint.png";
import trash9Png from "@/images/icon/trash-9.png";
import soldOutPng from "@/images/icon/sold-out.png";
import { Navigator } from "@tarojs/components";
import { FootprintList } from "@/servers";
import "./footprint.less";

const Footprint = () => {
  const [hasPrint, setHasPrint] = useState(1);
  const [footprintList, setFootprintList] = useState<any[]>([]);
  const allPage = 1;
  const size = 8;
  useEffect(() => {
    getFootprintList();
  }, []);
  const getFootprintList = () => {
    FootprintList({ page: allPage, size }).then((res) => {
      if (res.count === 0) setHasPrint(0);

      console.log("res", res);

      let f1 = footprintList;
      let f2 = res.data;
      for (let i = 0; i < f2.length; i++) {
        let last = f1.length - 1;
        if (last >= 0 && f1[last][0].add_time == f2[i].add_time) {
          f1[last].push(f2[i]);
        } else {
          let tmp: any[] = [];
          tmp.push(f2[i]);
          f1.push(tmp);
        }
      }
      setFootprintList([...f1]);
    });
  };

  const toIndexPage = () => {};
  return (
    <div className="container">
      {hasPrint === 1 ? (
        <div className="print-goods">
          {footprintList.map((item) => {
            console.log("item", item);
            return (
              <div className="day-item">
                {item.length > 0 && (
                  <div className="day-hd">{item[0].add_time}</div>
                )}
                <div className="item-box">
                  {item.map((iitem, iindex) => {
                    console.log("iitem", iitem);
                    return (
                      <Navigator
                        hover-className="none"
                        // data-index="{{index}}"
                        // data-iindex="{{iindex}}"
                        className={`item ${iindex % 2 == 0 ? "left" : "right"}`}
                        url="/pages/goods/goods?id={{iitem.goods_id}}"
                      >
                        <img
                          src={trash9Png}
                          data-val={iitem.id}
                          className="cancel-print"
                          // catchtap='deletePrint'
                        />
                        <div className="box">
                          <img
                            className="img"
                            src={iitem.goods.list_pic_url}
                            background-size="cover"
                          >
                            {iitem.goods.goods_number == 0 && (
                              <div>
                                <div className="sold-img">
                                  <img className="soldout" src={soldOutPng} />
                                </div>
                              </div>
                            )}
                          </img>
                        </div>
                        <div className="goods-info {{iitem.goods.goods_number == 0?'fast-out-status':''}}">
                          <div className="goods-title">{iitem.goods.name}</div>
                          <div className="price-container">
                            <div className="l">
                              <div className="no-level">
                                ￥{iitem.goods.min_retail_price}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Navigator>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="no-print">
            <img src={footprintPng} className="no-print-img"></img>
            <div className="text">一个脚印都没有！</div>
            <div className="to-index-btn" onClick={toIndexPage}>
              马上去踩踩
            </div>
          </div>
          <div className="no-more-goods {{showNoMore? 'hidden':'show'}}">
            没有更多足迹了
          </div>
        </div>
      )}
    </div>
  );
};

export default Footprint;
