const PLAY_URL = 'http://123.207.32.32:9001'

const LOGIN_BASE_URL = 'http://localhost:3000'

// 获取token，作为参数，放入header中（后续其他接口需要token时不需要每个都添加）
const token = wx.getStorageSync('token')

class YHRequest {
  constructor(baseUrl, authHeader = {}) {
    this.baseUrl = baseUrl
    this.authHeader = authHeader
  }
  // isAuth 验证是否需要 authHeader
  request(url, method, data, isAuth = false, header = {}) {
    // 对固定的header和传递进来验证的header进行拼接
    const allHeader = isAuth ? { ...this.authHeader, ...header } : header
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        data,
        header: allHeader,
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

  get(url, data, isAuth = false, header) {
    return this.request(url, "get", data, isAuth, header)
  }

  post(url, data, isAuth = false, header) {
    return this.request(url, 'post', data, isAuth, header)
  }
}

// 传递参数 new 两个类，区分不同的base_url
const playRequest = new YHRequest(PLAY_URL)
const loginRequest = new YHRequest(LOGIN_BASE_URL, { token })   // 传递对象为了扩展，方便继续传值
export default playRequest
export {
  loginRequest
}