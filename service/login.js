import { loginRequest } from './request'

// 用wx.login登录获取code传递给服务器得到appid和session_key（token）
function loginAction(code) {
  return loginRequest.post('/login', { code })
}

// 解析token是否有效
function checkToken(token) {
  return loginRequest.post('/auth', {}, { token })
}

export {
  loginAction,
  checkToken
}