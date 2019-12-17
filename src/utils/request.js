// 接口封装
const request = (path, data = {}, header = {}, method = 'GET') => {
  // 把异步请求放到Promise实例中
  let url = `https://www.zhengzhicheng.cn/api/public/v1/${path}`
  return new Promise(function (resolve, reject) {
    mpvue.request({
      url,
      method,
      data,
      header,
      success: function (res) {
        resolve(res)
      }
    })
  })
}

export default request
