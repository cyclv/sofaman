//post 封装请求
function postrequst(url,data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url:'http://dunge.lyworker.com/' + url,
      data: data,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        // console.log(res)
        resolve(res)
      }
    })
  })
}
// get 封装请求
function getrequst(url,data) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: 'http://dunge.lyworker.com/' + url,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        resolve(res.data)
      }
    })
  })
}
module.exports = {
  postrequst: postrequst,
  getrequst: getrequst
}