const Http = require('./http.js');
App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    Date.prototype.Format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData : {
    newOrder : []//用于结算生成最新订单
  }
})
/*
  cityInfo
  {
    "id": "1",
    "city_name": "上海",
    "city_pre": "S",
    "city_pinyin": "Shanghai",
    "city_short": "sh",
    "count": "141"
  }
  cinemaInfo
  {
      "id": "141",
      "cityName": "北京",
      "cinemaName": "北京博纳影城朝阳门旗舰店",
      "address": "北京市朝阳区三丰北里2号楼悠唐生活广场B1层（朝阳门钱柜对面）",
      "telephone": "010-59775660",
      "latitude": "39.92223",
      "longitude": "116.4388",
      "trafficRoutes": "乘坐101电，109电，110，112电，420，750路公交在朝阳门外站下车，悠唐生活广场地下一层"
  }
*/
