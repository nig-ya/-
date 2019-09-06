// pages/filmIntroduction/filmIntroduction.js
const Http = require('../../http.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film : {},
    isDown : false,//简介是否展开状态
    actors : [],//演员
    hasFilm : false,
    // 当前影片的索引
    movieIndex : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前影片的索引
    this.setData({
      movieIndex : options.index
    });

    let $this = this;
    wx.showLoading({
      title: '加载中'
    })
// 服务器数据
    Http.movieInfo_real(options.id,function(res){
      wx.hideLoading();
      let obj = JSON.parse(res.data.data);
      console.log(obj);
      let tempActors = obj.result.actors.split(',');
      console.log(tempActors)
      $this.setData({
        film: obj.result,
        actors: tempActors,
        hasFilm: true
      })
      wx.setNavigationBarTitle({
        title: obj.result.title
      })
    });

// 测试数据
    // Http.film(function (res) {
    //   wx.hideLoading();
    //   let tempActors = res.data.result.actors.split(',');
    //   console.log(tempActors)
    //   $this.setData({
    //     film: res.data.result,
    //     actors: tempActors,
    //     hasFilm: true
    //   })
    //   wx.setNavigationBarTitle({
    //     title: res.data.result.title
    //   })
    // });
  },
  updown(){
    if (this.data.isDown){
      this.setData({
        isDown : false
      })
    }
    else{
      this.setData({
        isDown: true
      })
    }
  },
  takeCheck(){
    let index = this.data.movieIndex;
    wx.navigateTo({
      url: `../cinemaMovieInfo/cinemaMovieInfo?idx=${index}`
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