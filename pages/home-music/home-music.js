// pages/home-music/home-music.js
import { getMusicBanner } from '../../service/home-music'
import { songStore, lyricStore } from '../../store/index'
import { queryRect, debounce } from '../../utils/utils.js'
import { songMap } from '../../store/index'
import { playlistStore } from '../../store/index'
import { isPlay } from '../../utils/common-store.js'

const app = getApp()
const debounceImgRect = debounce(queryRect)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight: 0,   //图片动态高度
    musicBanner: [],
    allSong: null,
    chinaSong: null,
    // 四种类型
    // newSong: [],
    recommendSong: [],
    // originSong: [],
    // upSong: [],
    // 统一管理四种类型
    // rankSong: { 0: {}, 2: {}, 3: {} }
    rankSong: {},

    isPlaying: false,
    pauseWidthplay: "play",

    isRunning: 'paused',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(app.globalData.phoneWidth);
    this.getMusicBanner()
    // 获取sortStore数据
    this.getSortStoreData()

    // 获取playListStore数据
    this.getPlayListStoreData()

    // 获取播放页面数据
    this.getPLayerStoreData()
    // 进入页面加载播放状态
    isPlay(!this.data.isPlaying, this)
    this.setData({ isRunning: 'running' })
  },

  changeImageLoad() {
    // 图片加载完毕再获取图片相关数据(防抖)，防抖后只会计算一次高度，可能导致widthFix没有获取到高度，height为240（bug）
    // 可以让防抖开始执行一次，最后也执行一次。
    // 获取图片本身高度，设置为swiper组件的高度
    debounceImgRect('.swiper-image').then(res => {
      const rect = res[0]
      this.setData({ swiperHeight: rect.height })
    })
  },

  async getMusicBanner() {
    const { banners } = await getMusicBanner()
    this.setData({ musicBanner: banners })
  },

  getSortStoreData() {
    /* 排行歌曲 */
    songStore.dispatch('getSortSong')
    // 设置值的时候抽离成函数
    songStore.onState("recommendSong", (res) => {
      if (res) {
        this.setData({ recommendSong: res.tracks.slice(0, 6) })
      }
    })
    songStore.onState("newSong", this.getRankSong(0))
    // songStore.onState("recommendSong", this.getRankSong(1))
    songStore.onState("originSong", this.getRankSong(2))
    songStore.onState("upSong", this.getRankSong(3))
  },

  getPlayListStoreData() {
    /* 歌曲分类 */
    playlistStore.dispatch("getHotSongAction", { limit: 6, offset: 0})  
    playlistStore.dispatch("getChinaSongAction", { limit: 6, offset: 0})  
    playlistStore.onStates(["allSong", "chinaSong"], ({ allSong, chinaSong }) => {
      this.setData({ allSong, chinaSong })
    })
  },

  getPLayerStoreData() {
    // 从首页开始默认是不播放的
    const id = wx.getStorageSync('playerId')
    lyricStore.dispatch("getLyricData", { id })
    lyricStore.onStates(["musicPlayer", "sliderValue"], ({ musicPlayer, sliderValue}) => {
      musicPlayer && this.setData({ musicPlayer })
      sliderValue && this.setData({ sliderValue })
    })
  },

  getRankSong(type) {
    return (res) => {
      if (res) {
        // 获取四种类型所需要的数据
        const name = res.name
        const songs = res.tracks.slice(0, 3)
        const coverImgUrl = res.coverImgUrl
        const playCount = res.playCount
        const songObj = { name, songs, coverImgUrl, playCount }
        // console.log(this);   // 使用箭头函数改变this指向
        const newRank = { ...this.data.rankSong, [type]: songObj }
        // const newRank = { [type]: songObj }
        this.setData({ rankSong: newRank })
      }
    }
  },

  // 跳转到详情（传递参数区分不同类型，新歌，热门，原创，飙升）
  navToMusicDetail(params) {
    // idx：四种榜单类型
    let idx
    if (params.detail) {
      idx = params.detail
    } else if (params.currentTarget.dataset.idx) {
      idx = params.currentTarget.dataset.idx
    }
    wx.navigateTo({
      url: `/pages/music-detail/music-detail?rankName=${songMap[idx]}`,
    })
  },

  toggleClick() {
    this.animatePlay()
    isPlay(!this.data.isPlaying, this)
  },

  animatePlay() {
    const isPlaying = !this.data.isPlaying
    this.setData({ isRunning: isPlaying ? 'running' : 'paused' })
  },

  navToPlayList() {
    wx.navigateTo({
      url: '/pages/play-list/play-list',
    })
  },

  navToSongItem(params) {
    const id = params.detail
    wx.navigateTo({
      url: `/pages/music-detail/music-detail?id=${id}`,
    })
  },

  changeSearch() {
    wx.navigateTo({
      url: '/pages/music-search/music-search',
    })
  },

  // 首页的播放进入
  bar2musicPlay() {
    this.getPLayerStoreData()
    const id = wx.getStorageSync('playerId')
    wx.navigateTo({
      url: `/pages/music-player/music-play?ids=${id}`,
    })
  },

  nav2musicPlay(event) {
    wx.navigateTo({
      url: `/pages/music-player/music-play?ids=${event.detail}`,
    })
  },
})