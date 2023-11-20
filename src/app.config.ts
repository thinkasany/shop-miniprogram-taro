export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/category/index",
    "pages/cart/index",
    "pages/ucenter/index",
  ],
  subpackages: [], // 分包
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "shop",
    navigationBarTextStyle: "black",
  },
  animation: false,
  tabBar: {
    color: "#6e6d6b",
    selectedColor: "#ff3456",
    borderStyle: "white",
    backgroundColor: "#fff",
    list: [
      {
        pagePath: "pages/index/index",
        iconPath: "images/nav/icon-index-b.png",
        selectedIconPath: "images/nav/icon-index-r.png",
        text: "首页",
      },
      {
        pagePath: "pages/category/index",
        iconPath: "images/nav/icon-cate-off.png",
        selectedIconPath: "images/nav/icon-cate-on.png",
        text: "分类",
      },
      {
        pagePath: "pages/cart/index",
        iconPath: "images/nav/icon-cart-b.png",
        selectedIconPath: "images/nav/icon-cart-r.png",
        text: "购物车",
      },
      {
        pagePath: "pages/ucenter/index",
        iconPath: "images/nav/icon-center-b.png",
        selectedIconPath: "images/nav/icon-center-r.png",
        text: "我的",
      },
    ],
  },
});
