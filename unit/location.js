// 加载QQ地理信息解析
const QQMapWX = require('../public/libs/qqmap-wx-jssdk.min.js')
// 地理信息Key
const key = 'TKGBZ-3N63J-RZTFH-F4IUB-ADKRT-6OFPY'
function curLocation(callback) {
  let qqmapsdk = new QQMapWX({
    key: key // 必填
  })
  // 获取定位信息
  wx.getLocation({
    type: 'wgs84',
    success(res) {
      // 获取当前位置
      wx.setStorageSync('startloc', res)
      // 反向解析地理信息
      qqmapsdk.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: function(addressRes) {
          callback(addressRes)
        },
        fail: function(error) {
          callback(error)
        }
      })
    },
    fail(err) {
      console.log(err)
    }
  })
}

module.exports = curLocation
