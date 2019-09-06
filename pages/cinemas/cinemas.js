// pages/cinemas/cinemas.js
const Http = require("../../http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cinemas : [],
    curPage : 1,
    totalpage : 1,
    cityid : 0
  },
  goMovie(event){
    // 获取电影院id
    let cinemaInfo = event.currentTarget.dataset.cinemainfo;
    wx.setStorageSync('cinemainfo', cinemaInfo);

    wx.switchTab({
      url: '../movie/movie',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let cityid = options.id;
    this.setData({
      cityid : cityid
    })
    this.getCinemas(cityid,1);
  },
  // 返回城市列表
  backCitys(){
    // type=1表面进入city是从电影院返回的，不是程序首次自动进入citys
    wx.navigateTo({
      url: '../citys/citys?type=1',
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
    this.getCinemas(this.data.cityid,this.data.curPage);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //获取影院列表数据
  // {"reason":"empty","result":null,"error_code":204203}
  getCinemas(cityid,page){
    // 判断当前页大于总页码的时候，提示没有更多数据，且不再请求
    if (this.data.curPage > this.data.totalpage){
      wx.showToast({
        title: '没有更多数据了'
      })
      return;
    }
    // 显示loading动画
    wx.showLoading({
      title: '加载中',
    })
    let $this = this;
    Http.cinemas_real(cityid, page,function (res) {
      // 取消loading动作
      wx.hideLoading();
      res = JSON.parse(res.data.data);
      if (res.error_code == 0) {
        // 临时数组接收数据，拼接加载等多产生的数据

        let tempCinemas = $this.data.cinemas;
        tempCinemas = tempCinemas.concat(res.result.data);

        $this.setData({
          cinemas: tempCinemas,
          curPage: res.result.page+1,
          totalpage: res.result.totalpage
        });
        
      }
      else if (res.error_code == 204203){
        wx.showToast({
          title: '没有更多数据了'
        })
      }

    });
  }
})