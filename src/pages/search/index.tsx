import searchIcon from "@/images/icon/search.png";
import searchDeleIcon from "@/images/icon/search-dele.png";
import ascIcon from "@/images/icon/asc.png";
import descIcon from "@/images/icon/desc.png";
import orderByIcon from "@/images/icon/order-by.png";
import soldOut from "@/images/icon/sold-out.png";
import trash9Icon from "@/images/icon/trash-9.png";
import noSearchICon from "@/images/icon/no-search.png";
import { Navigator, Input } from "@tarojs/components";
import { useState } from "react";
import "./index.less";

const Index = () => {
  const [keyword, setKeyword] = useState("");
  const [currentSortOrder, setCurrentSortOrder] = useState("asc");
  const [currentSortType, setCurrentSortType] = useState("default");
  const [defaultKeyword, setDefaultKeyword] = useState<any>({});
  const [goodsList, setGoodsList] = useState<any[]>([]);
  const [historyKeyword, setHistoryKeyword] = useState<any[]>([]);
  const [hotKeyword, setHotKeyword] = useState<any[]>([]);
  const [helpKeyword, setHelpKeyword] = useState<any[]>([]);
  const [searchStatus, setSearchStatus] = useState(false);
  const closeSearch = () => {};
  const openSortFilter = () => {};
  const onKeywordTap = () => {};
  const inputChange = (e) => {
    setKeyword(e.detail.value);
  };
  const inputFocus = () => {
    // 处理输入框聚焦事件
  };

  const onKeywordConfirm = () => {
    // 处理确认搜索事件
  };
  const clearHistory = () => {};
  const clearKeyword = () => {};
  return (
    <div className="container" style={{ height: "100%" }}>
      <div className="search-header">
        <div className="input-box">
          <img className="icon-search" src={searchIcon} />
          <Input
            name="input"
            className="keywrod"
            focus
            value={keyword}
            confirm-type="search"
            onInput={inputChange}
            onFocus={inputFocus}
            onConfirm={onKeywordConfirm}
            confirmType="search"
            placeholder={defaultKeyword.keyword}
          />
          {keyword && (
            <img src={searchDeleIcon} className="del" onClick={clearKeyword} />
          )}
        </div>
        <div className="right" onClick={closeSearch}>
          取消
        </div>
      </div>
      {!searchStatus && (
        <div className="no-search">
          {!keyword && !!historyKeyword.length && (
            <div className="serach-keywords search-history">
              <div className="h">
                <text className="title">历史记录</text>
                <img src={trash9Icon} className="icon" onClick={clearHistory} />
              </div>
              <div className="b">
                {historyKeyword.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="item"
                      onClick={onKeywordTap}
                      data-keyword={item}
                      hover-class="navigator-hover"
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {!keyword ? (
            <div className="serach-keywords search-hot">
              <div className="h">
                <text className="title">热门搜索</text>
              </div>
              <div className="b">
                {hotKeyword.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`item ${item.is_hot === 1 ? "active" : ""}`}
                      hover-class="navigator-hover"
                      onClick={onKeywordTap}
                      data-keyword={item.keyword}
                    >
                      {item.keyword}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="shelper-list">
              {helpKeyword.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="item"
                    hover-class="navigator-hover"
                    onClick={onKeywordTap}
                    data-keyword={item}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      {searchStatus && goodsList.length && (
        <div className="search-result">
          <div className="sort">
            <div className="sort-box">
              <div
                className={`item ${
                  currentSortType == "default" ? "active" : ""
                }`}
                onClick={openSortFilter}
                id="defaultSort"
              >
                <div className="txt">综合</div>
              </div>
              <div
                className="item {{currentSortType == 'price' ? 'active' : ''}}"
                onClick={openSortFilter}
                id="priceSort"
              >
                <div className="txt">价格</div>
                {currentSortType == "default" || currentSortType == "sales" ? (
                  <img className="icon" src={orderByIcon} />
                ) : (
                  <div>
                    <img
                      className="icon"
                      src={currentSortOrder === "asc" ? ascIcon : descIcon}
                    />
                  </div>
                )}
              </div>
              <div
                className="item {{currentSortType == 'sales' ? 'active' : ''}}"
                onClick={openSortFilter}
                id="salesSort"
              >
                <div className="txt">销量</div>
                {currentSortType == "default" || currentSortType == "price" ? (
                  <img className="icon" src={orderByIcon} />
                ) : (
                  <div>
                    <img
                      className="icon"
                      src={currentSortOrder === "asc" ? ascIcon : descIcon}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="cate-item">
            <div className="b">
              <div className="list-wrap clearfix">
                {goodsList.map((iitem, iindex) => {
                  return (
                    <div
                      key={iindex}
                      className={`goods-box ${
                        (iindex + 1) % 2 == 0 ? "no-margin" : ""
                      }`}
                    >
                      <Navigator
                        hover-class="none"
                        className="navi-url"
                        url="/pages/goods/goods?id={{iitem.id}}"
                      >
                        <div className="box">
                          <img src={iitem.list_pic_url} className="image">
                            {iitem.is_new == 1 && (
                              <div className="new-tag">新品</div>
                            )}
                          </img>
                          {iitem.goods_number == 0 && (
                            <div>
                              <div className="sold-img">
                                <img className="soldout" src={soldOut} />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="goods-info {{iitem.goods_number == 0?'fast-out-status':''}}">
                          <div className="goods-title">{iitem.name}</div>
                          <div className="price-container">
                            <div className="l">
                              <div className="h">
                                ￥{iitem.min_retail_price}
                              </div>
                            </div>
                            <div className="r">
                              <div className="t">99人买过</div>
                            </div>
                          </div>
                        </div>
                      </Navigator>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="no-more">没有更多商品了</div>
        </div>
      )}

      {!goodsList.length && searchStatus && (
        <div className="search-result-empty">
          <img className="icon" src={noSearchICon}></img>
          <text className="text">没找到，换个关键字试试</text>
        </div>
      )}
    </div>
  );
};

export default Index;
