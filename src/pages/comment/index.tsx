import React, { useState } from "react";
import { GoodsComment } from "@/servers";
import Taro from "@tarojs/taro";
import "./index.less";

const Index: React.FC = () => {
  const [type, setType] = useState(1);
  const [commentList, setCommentList] = useState<any[]>([]);
  Taro.useDidShow(async () => {
    const $instance = Taro.getCurrentInstance();
    if ($instance?.router?.params!.goodsid) {
      const data = await GoodsComment({
        id: $instance?.router?.params!.goodsid,
      });
      setCommentList(data);
    }
  });
  const handleNav = (e) => setType(e.target.dataset.num);
  const preview = (event) => {
    const index = event.currentTarget.dataset.index;
    const current = event.currentTarget.dataset.url;
    const list = commentList[index].image_url;
    Taro.previewImage({
      current, // 当前显示图片的http链接
      urls: list, // 需要预览的图片http链接列表
    });
  };
  return (
    <div className="comment">
      <div className="head">
        <text
          data-num="1"
          className={`t ${type == 1 ? "active" : ""}`}
          onClick={handleNav}
        >
          全部
        </text>
        <text
          data-num="2"
          className={`t ${type == 2 ? "active" : ""}`}
          onClick={handleNav}
        >
          好评(99+)
        </text>
        <text
          data-num="3"
          className={`t ${type == 3 ? "active" : ""}`}
          onClick={handleNav}
        >
          中差评(0)
        </text>
      </div>
      {type === 1 || type === 2 ? (
        <div className="content">
          {commentList.map((item, index) => {
            return (
              <div className="list" key={index}>
                <div className="list_head">
                  <img src={item.avatar}></img>
                  <div className="info">{item.name}</div>
                </div>
                <div className="list_center">{item.content}</div>
                {!!item.image_url.length && (
                  <div className="list_bottom">
                    {item.image_url.map((iitem, iindex) => {
                      return (
                        <img
                          key={iindex}
                          onClick={preview}
                          data-url={iitem}
                          data-index={iindex}
                          src={iitem}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="footer">已折叠99+条对您帮助不大的评价{">"}</div>
        </div>
      ) : (
        <div className="noContent">暂无中差评</div>
      )}
    </div>
  );
};

export default Index;
