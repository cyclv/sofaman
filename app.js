//app.js
const dunge = require('utils/base.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //console.log(res.code)
        dunge.getrequst('api/openid', { js_code: res.code}).then(function(res){
          //console.log(res.data.openid.openid)
          wx.setStorageSync('openid', res.data.openid.openid)
          // 查询用户信息
          dunge.getrequst('api/user', {openid: res.data.openid.openid}).then(function(){
            //console.log('用户信息',res)
          })
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})