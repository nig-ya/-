const Http = require("../../http.js");
let location = require("../../unit/location.js");

Page({
  /**
   * 页面的初始数据
   */
  data: {
    curCity: "",
    citys: {}
  },
  goCinema(event) {
    // 存储当前选中的城市信息
    let cityInfo = event.currentTarget.dataset["cityinfo"];
    wx.setStorageSync("cityinfo", cityInfo);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let cinemainfo = wx.getStorageSync("cinemainfo");
    if (cinemainfo && options.type == undefined) {
      wx.switchTab({
        url: "../movie/movie"
      });
    } else {
      let $this = this;
      // 获取当前经纬度信息，并反向解析地址
      location(function(res) {
        $this.setData({
          curCity: res.result.address_component.city
        });
        // // 截取反向地址字符串，比如：北京市->北京
        // let tempCity = $this.data.curCity.substring(0, $this.data.curCity.length-1);
        // // 根据城市名称获取城市id
        // Http.getCityIdByName(tempCity,function(res){
        //   // console.log(res)
        //   // 获取城市id后自动跳转至当前城市
        //   wx.navigateTo({
        //     url: `../cinemas/cinemas?id=${res.data.data.id}`,
        //   })
        // })
        // // 结束
      });

      // 显示加载等待
      wx.showLoading({
        title: "加载中"
      });
      Http.citys(function(res) {
        // 声明一个临时对象，存放所有的数据
        let citys = {};
        for (var i = 0; i < 26; i++) {
          // 将十进制数字转换为对应的ascii码
          let char = String.fromCharCode(65 + i);
          citys[char] = [];
        }

        // 生成了citys之后，准备对号入座
        // citys = {'A':['安庆','安阳'],'B':[],'C':['重庆']...}
        let tempCitys = res.data.citys;
        for (let i = 0; i < tempCitys.length; i++) {
          let city = tempCitys[i];
          // 为了防止数据中有小写字母存在，统一toUpperCase转大写
          let char = city.city_pre.toUpperCase();
          citys[char].push(city);
        }
        $this.setData({
          citys: citys
        });
        // 隐藏加载提示
        wx.hideLoading();
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
