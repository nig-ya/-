// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickname : '未登录>',
    avatar : '',
    gender : '',
    islogin : false
  },
  login(){
    // 如果用户已登录则不再前往授权登录界面
    if(this.data.islogin) return;
    wx.navigateTo({
      url: '../login/login',
    })
  },
  goodsOrderList(){
    // 需要判断是否已登录
    wx.navigateTo({
      url: '../goodsOrderList/goodsOrderList',
    })
  },
  loginout(){
    wx.clearStorage();
    this.setData({
      islogin: false,
      avatar: '',
      nickname: '未登录>',
      gender: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let userinfo = wx.getStorageSync('userinfo');
    if(userinfo){
      this.setData({
        islogin : true,
        avatar: userinfo.avatarUrl,
        nickname: userinfo.nickName,
        gender: userinfo.gender
      })
    }
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