// pages/goodsOrderList/goodsOrderList.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsOrderList : {},
    hasOrder : false //默认没有订单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder();
  },
  getOrder(){
    let templist = wx.getStorageSync('goodsOrderList');//{},undefined
    if (templist && JSON.stringify(templist) != '{}') {
      // 渲染卖品订单列表页
      this.setData({
        goodsOrderList: templist,
        hasOrder: true
      })
    }
    else {
      // 渲染空白页
      this.setData({
        hasOrder: false
      })
    }
  },
  // 取消订单
  cancelOrder(event){
    // 得到当前的订单编号
    let orderId = event.currentTarget.id;
    let templist = wx.getStorageSync('goodsOrderList');
    delete templist[orderId];

    let $this = this;
    wx.setStorage({
      key: 'goodsOrderList',
      data: templist,
      success(){
        // 删除订单后刷新数据
        $this.getOrder();
      }
    });
    
  },
  // 进入订单详情
  orderDetail(event){
    let orderId = event.currentTarget.id;
    App.globalData.newOrder = this.data.goodsOrderList[orderId].orderData;
    wx.navigateTo({
      url: '../order/order'
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