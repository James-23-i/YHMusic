const BASE_URL = 'http://123.207.32.32:9001'

// const LOGIN_BASE_URL = 'http://123.207.32.32:3000'
const LOGIN_BASE_URL = 'http://localhost:3000'

class YHRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  request(url, method, data, header = {}) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        data,
        header,
        method,
        success: function(res) {
          resolve(res.data)
        },
        fail: function(err) {
          reject(err)
        }
      })
    })
  }

  get(url, data, header) {
    return this.request(url, "get", data, header)
  }

  post(url, data, header) {
    return this.request(url, 'post', data, header)
  }
}

// 传递参数 new 两个类，区分不同的base_url
const playRequest = new YHRequest(BASE_URL)
const loginRequest = new YHRequest(LOGIN_BASE_URL)
export default playRequest
export {
  loginRequest
}