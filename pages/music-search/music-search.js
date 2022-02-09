import { getSesarchList, getSesarchSuggest, getSearch } from '../../service/home-search'

// pages/music-search/music-search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: [],
    keywords: "",   // 输入的关键字
    realKeywords: "", // 真正搜索发送请求的关键字
    searchSongs: [],
    bestSongs: [],
    songRichNodes: [],
    isSearch: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchList()
  },

  async getSearchList() {
    const res = await getSesarchList()
    this.setData({ searchList: res.result.hots })
  },

  toSearch(event) {
    const keywords = event.detail
    this.getBestSongs(keywords)
  },

  searchItemToKeywords(event) {
    // this.bestSearch(event)
    const index = event.currentTarget.dataset.index
    this.setData({ keywords: this.data.searchSongs[index].keyword })
    this.getBestSongs(this.data.keywords)
  },

  bestSearch(event) {
    const keywords = event.currentTarget.dataset.keywords
    this.setData({ keywords })
    this.getBestSongs(keywords)
  },

  // 统一获取最佳匹配音乐
  getBestSongs(keywords) {
    getSearch(keywords).then(res => {
      this.setData({ bestSongs: res.result.songs, isSearch: true })
    })
  },

  changeSearch(event) {
    this.setData({ keywords: event.detail })
    if (this.data.keywords.trim().length === 0) {
      this.setData({ searchSongs: [] })
      this.setData({ bestSongs: [] })
      return
    }
    this.getSesarchSuggest(this.data.keywords)
  },

  async getSesarchSuggest(keywords) {
    const res = await getSesarchSuggest(keywords)
    this.setData({ searchSongs: res.result.allMatch, isSearch: false})

    // 获取所有搜索keywords
    const nodes = []
    // 解决输入框没有值时，还存在搜索数据（或者使用取消防抖直接不调函数）
    if (!this.data.searchSongs || this.data.keywords.trim().length === 0) return
    this.data.searchSongs.map(item => {
      const node = []
      if (item.keyword.startsWith(this.data.keywords)) {
        // 查看获取到的值和搜索的值是否匹配
        // 匹配的值和没有匹配的值进行字符串切割
        const regKeywords = this.data.keywords.trim().slice(0, this.data.keywords.trim().length)
        const noRegKeywords = item.keyword.trim().slice(this.data.keywords.trim().length)
        const regObj = {
          name: "span",
          attrs: {
            style: 'color: green;'
          },
          children: [{
            type: 'text',
            text: regKeywords
          }]
        }
        const noRegObj = {
            name: "span",
            attrs: {
              style: 'color: #000000;'
            },
            children: [{
              type: 'text',
              text: noRegKeywords
            }]
        }
        node.push(regObj)
        node.push(noRegObj)
      }
      nodes.push(node)
      this.setData({ songRichNodes: nodes })
    })
  },

  nav2musicPlay(event) {
    wx.navigateTo({
      url: `/pages/music-player/music-play?ids=${event.detail}`,
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