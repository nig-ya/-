// pages/product/product.js

const Http = require('../../http.js');
let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 存储所有的列表新
    goods : [],
    // 存储当前选中的列表信息
    goodslist : {},
    // 存储当前选中的列表id
    catalogSelect : 1,
    // 当前选中的列表标题
    curTitle : '',
    // isCartListEmpty 用来标记购物车列表是否为空，true表示空，false表示不空
    // 为true则结算按钮是金色，否则为灰色
    isCartListEmpty : true,
    // 定义商品总价
    totalPrice : 0,
    // 定义购物车角标的数量
    countMarker : 0,    
    // 点击购物车按钮出现或隐藏购物车列表
    isShowCartList : false,
    // 购物车列表数据
    cartlist : [],
    // 电影院信息
    cinema_info : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 第一次初始化进入，清空购物车数据，以防上次有购物车数据没删除
    wx.removeStorageSync('cartlist');
    wx.showLoading({
      title: '加载中',
    })
    let $this = this;

    Http.getSaleGoods(function (res) {
      $this.setData({
        goods: res.data.result,
        goodslist: res.data.result[0],
        curTitle: res.data.result[0].title
      })
      wx.hideLoading();
    });
  },
  showCartList(){
    if(this.data.isShowCartList){
      this.setData({
        isShowCartList : false
      })
    }
    else{
      if (!this.data.isCartListEmpty)
      {
        this.setData({
          isShowCartList: true
        })
      }
    }
  },
  // 结算生成订单
  checkout(){
    // 判断购物车是否为空，如果为空则返回，不为空则生成订单
    if(this.data.isCartListEmpty) return;
    let $this = this;
    // 生成当前订单数据
    App.globalData.newOrder = $this.data.cartlist;
    wx.navigateTo({
      // url: `../order/order?cartlist=${JSON.stringify(this.data.cartlist)}`,
      url: '../order/order',
      success(){       
        // 生成订单列表
        $this.createOrder($this.data.cartlist);
        // 清空购物车
        $this.clearCartlist();
      }
    })
  },
  // 生成订单
  createOrder(cartlist){
    let goodsOrderList = wx.getStorageSync('goodsOrderList') ? wx.getStorageSync('goodsOrderList') : {};
    // key为订单编号
    let key = 'wx' + new Date().Format("yyyyMMddhhmmss");
    goodsOrderList[key] = { 'orderTime': new Date().Format("yyyy-MM-dd hh:mm"), 'orderData': cartlist };

    wx.setStorage({
      key: 'goodsOrderList',
      data: goodsOrderList
    })
  },
  // 加减法
  cartAddMinus(event){
    let goodsId = event.currentTarget.dataset.goodsid;
    let type = event.currentTarget.dataset.type;

    for (let i = 0; i < this.data.goods.length; i++) {
      let tempGoods = this.data.goods[i];
      for (let j = 0; j < tempGoods.data.length; j++) {
        if (tempGoods.data[j].id == goodsId)
        {
          // type ==1 加法
          if(type == 1){
            tempGoods.data[j].count++;
            // 添加一个持久存储
            this.storage(tempGoods.data[j],1);
          }
          // 减法
          else if(type == 0){
            if (tempGoods.data[j].count > 0){
              tempGoods.data[j].count--;
              // 删除一个持久存储
              this.storage(tempGoods.data[j], 0);
            }
          }
          let newGoods = this.data.goods;
          this.setData({
            goods : newGoods,
            goodslist: tempGoods
          });
          return;
        }
      }
    }
  },
  // 持久存储
  /*
    goods表示要存储或删除的商品
    type为1 表示新增，为0表示删除
  */
  storage(goods,type){
    // 第一次添加数据storage为空，则使用一个空数组添加goods商品，第二次、第三次...storage不为空，则在当前storage基础上进行添加和删除
    let cartlist = wx.getStorageSync('cartlist') ? wx.getStorageSync('cartlist') : [];
    // type == 1表示添加数据
    if(type == 1){
      // flag用来标记goods商品在购物车列表中是否已存在，false表示不存在，true表示已存在
      let flag = false;
      // 循环整个购物车列表，寻找是否goods已经存在
      for(let i=0;i<cartlist.length;i++){
        // 如果if条件成立，则找到了已有的goods商品
        if (cartlist[i].id == goods.id){
          flag = true;
          cartlist[i] = goods;
          break;
        }
      }
      if(flag == false){
        cartlist.unshift(goods);
      }
    }
    // 表示删除数据
    else{
      for (let i = 0; i < cartlist.length; i++) {
        // 如果if条件成立，则找到了已有的goods商品
        if (cartlist[i].id == goods.id) {
          // 判断购物车商品数量，大于1 则 减1 ，等于1则直接从购物车删除
          if(cartlist[i].count > 1){
            cartlist[i] = goods;                        
          }
          else{
            cartlist.splice(i,1);
          }
        }
      }
    }
    // 处理isCartListEmpty
    if(cartlist.length > 0){
      this.setData({
        isCartListEmpty : false
      })
    }
    else{
      this.setData({
        isCartListEmpty: true,
        isShowCartList: false//当数据为空的时候不显示购物车列表

      })
    }
    // 处理totalPrice和处理购物车角标
    let tempTotal = 0;//记录总价
    let tempCount = 0;//记录总数量
    // 遍历购物车里面的所有商品
    for(let i=0;i<cartlist.length;i++){
      // 总价等于每个商品的 单价*数量
      tempTotal += cartlist[i].price * cartlist[i].count;
      tempCount += cartlist[i].count;
    }
    this.setData({
      totalPrice: tempTotal,
      countMarker: tempCount
    })

    wx.setStorage({
      key: 'cartlist',
      data: cartlist,
      success(){
        // console.log(cartlist);
      }
    })
    // 给模板的购物车列表赋值
    this.setData({
      cartlist : cartlist
    })

  },
  // 清空购物车
  clearCartlist(){
    // 清空购物车列表
    wx.removeStorageSync('cartlist');
    // 还原goods原始数据
    let newGoods = this.data.goods;
    for (let i = 0; i < newGoods.length; i++) {
      for (let j = 0; j < newGoods[i].data.length; j++){
        newGoods[i].data[j].count = 0;
      }
    }
    // 还原当前goodlist数据
    let newGoodsList = this.data.goodslist;
    for (let i = 0; i < newGoodsList.data.length;i++){
      newGoodsList.data[i].count = 0;
    }
    
    this.setData({
      goods: newGoods,
      goodslist: newGoodsList
    });
    // 还原其他数据
    this.setData({
      isCartListEmpty: true,
      isShowCartList: false,
      totalPrice: 0,
      countMarker: 0,
      cartlist: []
    })
  },
  showlist(event){

    this.setData({//把选中值放入判断值
      catalogSelect: event.currentTarget.dataset.select
    })

    let goodsId = event.currentTarget.id;
    for(let i=0;i<this.data.goods.length;i++){
      let goodsItem = this.data.goods[i];
      if(goodsItem.id == goodsId){
        this.setData({
          goodslist: goodsItem,
          curTitle: goodsItem.title
        });
      }
    }
  },
  cinemas() {
    let cityId = wx.getStorageSync('cityinfo').id
    wx.navigateTo({
      url: `../cinemas/cinemas?id=${cityId}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      cinema_info : wx.getStorageSync('cinemainfo')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})