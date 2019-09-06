let plugin = requirePlugin("myPlugin")
// 终点位置
let cinemainfo = wx.getStorageSync('cinemainfo');
// 起点位置
let startloc = wx.getStorageSync('startloc');

let routeInfo = {
  // startLat: startloc.latitude,    //起点纬度 选填
  // startLng: startloc.longitude,    //起点经度 选填
  startName: "我的位置",   // 起点名称 选填
  endLat: cinemainfo.latitude,    // 终点纬度必传
  endLng: cinemainfo.longitude,  //终点经度 必传
  endName: cinemainfo.cinemaName,  //终点名称 必传
  mode: "car"  //算路方式 选填
}

Page({
  data: {
    routeInfo: routeInfo
  },
  onLoad(options){
    
  }
})