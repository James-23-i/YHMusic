export function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: res => {
        resolve(res)
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

export function checkSession() {
  return new Promise((resolve) => {
    wx.checkSession({
      // 没有返回值
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}