// pages/home-video/home-video.js
import { getTopMv } from '../../service/home-video'

const app = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    hasMore: true,
    offset: 0,
    limit: 30,
    showLoading: false,
    loadingHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const loadingHeight = app.loadingHeight
    this.setData({ loadingHeight })
    this.getTopMvData()
  },

  changeNavTo(data) {
    const id = data.detail
    wx.navigateTo({
      url: `/pages/video-detail/video-detail?id=${id}`,
    })
  },

  getTopMvData: async function() {
    if (!this.data.hasMore) return
    const params = { offset: this.data.offset, limit: this.data.limit }
    const { data, hasMore } = await getTopMv(params)
    this.setData({ videoList: [...this.data.videoList, ...data], hasMore, showLoading: false })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ offset: 0, videoList: [] })
    this.getTopMvData()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({ showLoading: true })
    this.data.offset++
    this.getTopMvData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})