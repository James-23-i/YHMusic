import { lyricStore, audioContext } from '../../store/index'
import { isPlay } from '../../utils/common-store.js'

const app = getApp().globalData

// pages/music-player/music-play.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ids: '',
    statusBarHeight: app.statusBarHeight,
    contentHeight: 0,
    musicPlayer: null,
    current: 0,
    lyricText: "",
    lyricList: [],
    sliderValue: 0,
    currentTime: 0,
    durationTime: 0,
    isSliderChanging: false,
    lyrics: '',
    currentIndex: 0,
    scrollLyricTop: 0,
    playWay: ["sortPlay", "rotate", "random"],
    playWayName: "sortPlay",
    playWayIndex: 0,
    isPlaying: false,
    pauseWidthplay: "play",
    playListIndex: 0,
    playLists: [],
    isRunning: 'paused',
    imgWidth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置缓存播放模式
    const playWayIndex = wx.getStorageSync('playWayIndex') || 0
    this.setData({ playWayIndex })

    const ids = options.ids
    // 计算歌曲详情的高度
    const screenHeight = app.screenHeight
    const statusBarHeight = app.statusBarHeight
    const navHeight = app.navHeight
    this.setData({ contentHeight: screenHeight - statusBarHeight - navHeight })
    this.setData({ ids })

    const imgWidth = app.screenWidth - 25
    this.setData({ imgWidth })

    this.getPLayerStoreData()
    isPlay(!this.data.isPlaying, this)
    this.setData({ isRunning: 'running' })
  },

  getPLayerStoreData() {
    lyricStore.onStates(['musicPlayer', 'durationTime', 'lyricText', 'lyricList', 'playListIndex', 'playLists'], ({musicPlayer, durationTime, lyricText, lyricList, playListIndex, playLists }) => {
      musicPlayer && this.setData({ musicPlayer })
      durationTime && this.setData({ durationTime })
      lyricText && this.setData({ lyricText })
      lyricList && this.setData({ lyricList })  
      playListIndex && this.setData({ playListIndex })
      playLists && this.setData({ playLists })
    })
    lyricStore.onStates(["currentTime", "currentIndex", "lyrics", "sliderValue"], ({ currentTime, currentIndex, lyrics, sliderValue }) => {
      if (currentTime !== undefined && !this.data.isSliderChanging) {
        this.setData({ currentTime })
      }
      if (sliderValue !== undefined && !this.data.isSliderChanging) {
        this.setData({ sliderValue })
      }
      if (currentIndex !== undefined) { this.setData({ currentIndex, scrollLyricTop: currentIndex * 20 }) }
      lyrics && this.setData({ lyrics })
    })
  },

  // 点击slider跳转到指定位置值（并且设置currentTime）
  sliderChange(event) {
    console.log('点击滑块');
    // 获取当前 sliderValue 和 currentTime
    const sliderValue = event.detail.value
    const currentTime = this.data.durationTime * sliderValue / 100
    // 点击slider跳转，先暂停播放
    // audioContext.pause()  // 从暂停位置开始播放 pause， 从开头位置播放 stop
    audioContext.seek(currentTime / 1000)   // 单位 s
    this.setData({ sliderValue, currentTime, isSliderChanging: false })
  },

  // 滑动slider的值（滑动时不应该设置value和currentTime，当放开时才设置）
  sliderChanging(event) {
    console.log('滑动滑块');
    const sliderValue = event.detail.value   // ( 0 ~ 100 )
    const currentTime = this.data.durationTime * sliderValue / 100
    this.setData({ isSliderChanging: true, sliderValue, currentTime })
  },

  swiperChange(event) {
    this.setData({ current: event.detail.current })
  },

  nav() {
    wx.navigateBack()
  },

  // 改变播放方式 0：顺序， 1： 单曲， 2： 随机
  changePlayWay() {
    lyricStore.dispatch("setPlayWay")
    lyricStore.onStates(["playWayIndex", "playWayName"], ({ playWayIndex, playWayName }) => {
      // playWayIndex 为 0 时，条件不成立
      if (playWayIndex !== undefined) { this.setData({ playWayIndex }) }
      playWayName && this.setData({ playWayName })
    })
    const titleMap = ['顺序播放', '单曲循环', '随机播放']
    wx.showToast({
      title: titleMap[this.data.playWayIndex],
      icon: 'none',
    })
  },

  // 设置暂停和开始播放
  changeWithPause() {
    this.animatePlay()
    isPlay(!this.data.isPlaying, this)
  },

  animatePlay() {
    const isPlaying = !this.data.isPlaying
    this.setData({ isRunning: isPlaying ? 'running' : 'paused' })
  },

  // 设置上一首下一首
  changePreSong() {
    lyricStore.dispatch("setPlayPreAndNext", false)
  },
  changeNextSong() {
    lyricStore.dispatch("setPlayPreAndNext")
  },
})