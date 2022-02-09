// pages/home-profile/home-profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handleGetUserInfo() {
    wx.getUserProfile({
      desc: '完善个人信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
      }
    })
  },

  handleGetPhoneNumber(event) {
    console.log(event);   // 获取到手机信息的加密数据，传递给服务器进行解析
    // 最新使用服务器的接口换取动态令牌 code -> phonenumber.getPhoneNumber
  }
})