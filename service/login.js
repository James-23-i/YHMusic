import { loginRequest } from './request'

// 用wx.login登录获取code传递给服务器得到appid和session_key（token）
/** 
 * 1、登录通过 wx.login() 获取 code，发送网络请求 传递到开发者服务器
 * 2、开发者服务器拿到 code，自己通过 code、appid、appSecret、固定的 authorization_code 拼接
 * 3、auth.code2Session -> 请求地址，发送给微信服务器，返回给开发者服务器对应的 openid、session_key
 * 4、用自定义登录态对 openid、session_key 关联 -> 一般关联后为 token
 * 5、小程序端获取到 token 进行 存储，发起请求给开发者服务器，判断是否有 token、过期、失效，对其是否继续登录（加上 checkSession，判断 session_key是否过期）
 * 6、真正拿到 openid，通过 getUserProfile 获取用户信息进行展示（记录一些收藏购物车的功能）
 * 7、其中有 unionid，是用来多平台共享的，小程序、公众号、app、pc端...（而这些默认是用 openid 在这里不是唯一的，得用 unionid，唯一标识）
 * 8、如果初始使用小程序登录授权，比如第三方登录，然后又绑定手机号或者邮箱来验证唯一标识，就是为了拿到 unionid 多平台共享
*/
function loginAction(code) {
  return loginRequest.post('/login', { code })
}

// 解析token是否有效
function checkToken() {
  return loginRequest.post('/auth', {}, true)
}

export {
  loginAction,
  checkToken
}