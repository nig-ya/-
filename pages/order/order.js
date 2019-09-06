// pages/order/order.js
let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 总数据
    list : [],
    // 临时数据
    cartlist : [],
    // 标识当前是否展开了购物车列表，默认为false
    isShowMore : false,
    totalPrice : 0,
    cinema_info : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if(options.cartlist && options.gp){
    //   let cartlist = options.cartlist+options.gp;
    //   console.log(cartlist);
    // }
    // else{
    //   // console.log('直接使用')
    //   console.log(options.cartlist);
    // }

    let cartlist = App.globalData.newOrder;
    // 生成总价
    let price = 0;
    for(let i=0;i<cartlist.length;i++){
      price += cartlist[i].count * cartlist[i].price;
    }
    this.setData({
      totalPrice: price,
      list : cartlist
    });
    this.initCartlist();
    
  },
  // 生成cartlist的数据
  initCartlist(){
    let count = 2; //最多给临时数据添加两条数据
    let tempCartlist = [];
    for (let i = 0; i < this.data.list.length; i++) {
      if (i < count) {
        tempCartlist.push(this.data.list[i]);
      }
      else {
        break;
      }
    }
    this.setData({
      cartlist: tempCartlist
    });
  },
  loadmore(){
    // 需要收起
    if (this.data.isShowMore){
      this.initCartlist();
    }
    // 需要展开
    else{
      this.setData({
        cartlist : this.data.list
      })
    }
    // 设置more的状态
    this.setData({
      isShowMore : !this.data.isShowMore
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
      cinema_info: wx.getStorageSync('cinemainfo')
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