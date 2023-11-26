import request from "@/request";

// 登录
export const AuthLoginByWeixin = async (data) =>
  await request({
    url: "auth/loginByWeixin",
    method: "post",
    data: { info: data },
  }); //微信登录

//首页数据接口
export const IndexUrl = async () => await request({ url: "index/appInfo" });

export const ShowSettings = async () => await request({ url: "settings/showSettings" });
export const SaveSettings = async (data) => await request({ url: "settings/save", method: "post", data });
export const SettingsDetail = async () => await request({ url: "settings/userDetail" });


// 收货地址
export const getAddressDetail = async (data) => await request({ url: "address/addressDetail", data });//收货地址详情
export const DeleteAddress = async () => await request({ url: "address/deleteAddress" });//删除收货地址
export const SaveAddress = async (data) => await request({ url: "address/saveAddress", method: "post", data });//保存收货地址
export const GetAddresses = async () => await request({ url: "address/getAddresses" });
export const RegionList = async (data) => await request({ url: "region/list", data });//获取区域列表

// 足迹
export const FootprintList = async (data) => await request({ url: "footprint/list", data }); //足迹列表
export const FootprintDelete = async (data) => await request({ url: "footprint/delete", data, method: "post" }); //删除足迹

// 分类
export const CatalogList = async () => await request({ url: "catalog/index" }); //分类目录全部分类数据接口
export const CatalogCurrent = async (data) => await request({ url: "catalog/current", data }); //分类目录当前分类数据接口
export const GetCurrentList = async (data) => await request({ url: "catalog/currentlist", data, method: "post" });

// 购物车
export const CartAdd = async (data) => await request({ url: "cart/add", method: "post", data });// 添加商品到购物车
export const CartList = async () => await request({ url: "cart/index" });//获取购物车的数据
export const CartUpdate = async (data) => await request({ url: "cart/update", method: "post", data });// 更新购物车的商品
export const CartDelete = async (data) => await request({ url: "cart/delete", method: "post", data });// 删除购物车的商品
export const CartChecked = async (data) => await request({ url: "cart/checked", method: "post", data });// 选择或取消选择商品
export const CartGoodsCount = async () => await request({ url: "cart/goodsCount" });// 获取购物车商品件数
export const CartCheckout = async (data) => await request({ url: "cart/checkout", data });// 下单前信息确认

// 商品
export const GoodsCount = async () => await request({ url: "goods/count" });// 统计商品总数
export const GoodsDetail = async (data) => await request({ url: "goods/detail", data });// 获得商品的详情
export const GoodsList = async (data) => await request({ url: "goods/list", data });// 获得商品列表
export const GoodsShare = async (data) => await request({ url: "goods/goodsShare", data });// 获得商品的详情
export const GoodsComment = async (data) => await request({ url: "goods/comment", data });// 获得商品评价
export const SaveUserId = async (data) => await request({ url: "goods/saveUserId", data });


// 订单
export const OrderSubmit = async (data) => await request({ url: "order/submit", data, method: 'post' });// 提交订单
export const OrderList = async (data) => await request({ url: "order/list", data });// 订单列表
export const OrderDetail = async (data) => await request({ url: "order/detail", data });// 订单详情
export const OrderDelete = async (data) => await request({ url: "order/delete", data });// 订单删除
export const OrderCancel = async (data) => await request({ url: "order/cancel", data });// 取消订单
export const OrderConfirm = async (data) => await request({ url: "order/confirm", data });// 物流详情
export const OrderCount = async (data) => await request({ url: "order/count", data });// 获取订单数
export const OrderCountInfo = async () => await request({ url: "order/orderCount" });// 我的页面获取订单数状态
export const OrderExpressInfo = async (data) => await request({ url: "order/express", data });// 物流信息
export const OrderGoods = async (data) => await request({ url: "order/orderGoods", data });// 获取checkout页面的商品列表

// 搜索
export const SearchIndex = async () => await request({ url: "search/index" });// 搜索页面数据
export const SearchHelper = async (data) => await request({ url: "search/helper", data });// 搜索帮助
export const SearchClearHistory = async () => await request({ url: "search/clearHistory", method: 'post' });
export const GetBase64 = async (data) => await request({ url: "search/getBase64", data });// 获取商品详情二维码

export const PayPrepayId = async(data) => await request({ url: "pay/preWeixinPay", data });

