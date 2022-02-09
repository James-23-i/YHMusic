// pages/video-detail/video-detail.js
import { getMvUrl, getRelateVideo, getVideoDetail } from '../../service/home-video'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvUrl: '',
    detailMv: null,
    relateVideos: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.getDetail(id)
  },

  getDetail(id) {
    // 数据是同时请求的，不需要await等待一个执行完才执行下一个，不需要使用await，也不需要promise.all全部完成
    // 使用then方式，
    const params = { id }
    getMvUrl(params).then(res => {
      this.setData({ mvUrl: res.data.url })
    })
    getVideoDetail(params).then(res => {
      this.setData({ detailMv: res.data })
    })
    getRelateVideo(params).then(res => {
      this.setData({ relateVideos: res.data })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})