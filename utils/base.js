function postrequst(url,data) {
  // console.log(url)
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