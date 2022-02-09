import { login, checkSession } from './utils/login'
import { loginAction, checkToken } from './service/login'

// app.js
App({
  onLaunch() {
    // 在app里面获取手机效果信息，给页面使用
    const phone = wx.getSystemInfoSync()
    console.log(phone);
    this.globalData.screenHeight = phone.screenHeight
    this.globalData.screenWidth = phone.screenWidth
    this.globalData.statusBarHeight = phone.statusBarHeight

    this.onCheck()
  },

  async onLogin() {
    const { code } = await login()
    if (code) {
      const { token } = await loginAction(code)
      wx.setStorageSync('token', token)
    }
  },
  async onCheck() {
    // 登录配置（判断是否有token，是否过期，token是否正确）
    const token = wx.getStorageSync('token')   // 判断 token 是否存在
    const checkResult = await checkToken(token)     // 判断 token 是否过期，无效
    console.log(checkResult);
    const sessionResult = await checkSession()  // 判断 session_key 是否过期
    if (!token || checkResult.errorCode || !sessionResult) {
      this.onLogin()
    }
  },
  globalData: {
    screenHeight: 0,
    screenWidth: 0,
    statusBarHeight: 0,
    navHeight: 44,
    loadingHeight: 30,
  }
})
