// pages/movie/movie.js
const Http = require("../../http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    cinema_info : {},
    movies : [],
    autoplay : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
// 获取轮播图
  movieSwiper(){
    let $this = this;
    // 获取轮播图
    Http.getSwiper(function (res) {
      $this.setData({
        imgUrls: res.data.data
      })
    });
  },
// 获取影片列表
  movieList(){
    // 获取电影院id
    let cinemaid = wx.getStorageSync('cinemainfo').id;

    let $this = this;
    wx.showLoading({
      title: '加载中',
    })
    Http.cinemasMovies(cinemaid, function (res) {
      let obj = JSON.parse(res.data.data);
      $this.setData({
        cinema_info: obj.result.cinema_info,
        movies: obj.result.lists
      })
      wx.hideLoading();
    });
  },
  // 购票
  buyTrick(event){
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../cinemaMovieInfo/cinemaMovieInfo?idx=${index}`
    })
  },
  // 影片详情
  movieDetail(event){
    let movieId = event.currentTarget.id;
    // 当前选中的影片的索引
    let index = event.currentTarget.dataset.index;
    wx.navigateTo({
      url: `../filmIntroduction/filmIntroduction?id=${movieId}&index=${index}`,
    })
  },
  cinemas(){
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
      autoplay : true
    })
    this.movieSwiper();
    this.movieList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      autoplay: false
    })
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