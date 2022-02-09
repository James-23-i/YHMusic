// pages/music-detail/music-detail.js
import { songStore } from "../../store/index";
import { getSongItemDetail } from '../../service/home-music'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    songDetail: [],
    name: "",
    songItemDetail: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const rankName = options.rankName
    const id = options.id
    if (rankName) {
      this.getStoreData(rankName)
    } else if (id) {
      this.getSongItemDetail(id)
    }
  },

  getStoreData(rankName) {
    songStore.dispatch('getSortSong')
    songStore.onState(rankName, (res) => {
      this.setData({ songDetail: res.tracks, name: res.name })
    })
  },

  async getSongItemDetail(id) {
    const res = await getSongItemDetail(id)
    this.setData({ songItemDetail: res.playlist })
  },

  nav2musicPlay(event) {
    wx.navigateTo({
      url: `/pages/music-player/music-play?ids=${event.detail}`,
    })
  },
})