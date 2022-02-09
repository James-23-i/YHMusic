import {
  HYEventStore
} from "hy-event-store"
import {
  getDetailMusicPlayer,
  getMusicLyric
} from '../service/music-player'
import {
  lyricParse
} from '../utils/utils'

// 设置后台播放  必须配置 "requiredBackgroundModes": ["audio"] / title
// const audioContext = wx.createInnerAudioContext()
const audioContext = wx.getBackgroundAudioManager()

// 播放方式定义
const playWay = ["sortPlay", "rotate", "random"]

const lyricStore = new HYEventStore({
  state: {
    id: '',
    musicPlayer: null,
    durationTime: 0,
    currentTime: 0,
    currentIndex: 0,
    sliderValue: 0,
    lyrics: '',
    lyricText: '',
    lyricList: [],
    isPlaying: false,
    playWayName: "sortPlay",
    playWayIndex: wx.getStorageSync('playWayIndex') || 0,
    playLists: wx.getStorageSync('playLists') || [],
    playListIndex: wx.getStorageSync('playListIndex') || 0,
  },

  // 同一首歌曲继续播放，上一首下一首列表索引，首页播放工具栏，animation-play-state 有style属性设置动画播放暂停
  actions: {
    // 歌词 时长设置
    getLyricData(ctx, { id }) {
      if (ctx.id == id) {
        console.log('同一首继续播放');
        this.dispatch("isPlayer", true)
        return
      }
      // 首次进来先清除上一首歌数据
      ctx.isPlaying = true   // 首次进来先设置为播放
      ctx.musicPlayer = null
      ctx.durationTime = 0
      ctx.currentIndex = 0
      ctx.currentTime = 0
      ctx.sliderValue = 0
      ctx.lyrics = ''
      ctx.lyricText = ''
      ctx.lyricList = []

      // 设置id
      ctx.id = id
      getDetailMusicPlayer(id).then(res => {
        if (res) {
          ctx.musicPlayer = res.songs[0]
          if (ctx.musicPlayer.id) audioContext.title = `${ctx.musicPlayer.name} - ${ctx.musicPlayer.ar[0].name}`
          ctx.durationTime = res.songs[0].dt
        }
      })

      getMusicLyric(id).then(res => {
        if (res) {
          ctx.lyricText = res.lrc.lyric
          const lyricList = lyricParse(res.lrc.lyric)
          ctx.lyricList = lyricList
        }
      })

      // 播放配置
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      console.log('src设置');
      // 自动播放加可以播放时的回调播放
      audioContext.autoplay = true

      this.dispatch('onListenerPlayer')
    },

    // 播放监听设置
    onListenerPlayer(ctx) {
      // audioContext.onCanplay(() => {
        console.log('play');
        audioContext.play()
      // })

      // 播放监听事件（获取每次播放的时间）
      audioContext.onTimeUpdate(() => {
        console.log('进入监听播放');
        // 当不是滑动时才设置value和currentTime
        // if (!this.data.isSliderChanging) {
        // 获取当前播放时间（单位 s）
        ctx.currentTime = audioContext.currentTime * 1000
        // 设置slider的当前值（0 ~ 10）
        ctx.sliderValue = ctx.currentTime / ctx.durationTime * 100
        // this.setData({ currentTime, sliderValue })
        // }
        // 时时监听设置歌词
        this.dispatch('setLyrics')
      })

      // 监听音频暂停
      audioContext.onPause(() => {
        console.log('监听音频暂停');
        ctx.isPlaying = false
      })

      audioContext.onPlay(() => {
        console.log('监听音频开始');
        ctx.isPlaying = true
      })

      // 监听歌曲是否播放完毕
      audioContext.onEnded(() => {
        console.log('播放完毕');
        // 自动播放下一首
        this.dispatch("setPlayPreAndNext")
      })
    },

    // 歌词重构
    setLyrics(ctx) {
      const list = ctx.lyricList
      const currentTime = ctx.currentTime
      for (let i = 0; i < list.length; i++) {
        const allTime = list[i].allTime
        if (currentTime < allTime) {
          // 获取上一个
          if (ctx.currentIndex !== i - 1) {
            ctx.lyrics = list[i - 1].text
            ctx.currentIndex = i - 1
          }
          // 必须终止循环，因为currentTime会一直变，会一直小于遍历出来的时间
          break
        }
      }
    },

    // 设置是否播放
    isPlayer(ctx, isPlaying) {
      ctx.isPlaying = isPlaying
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    },

    // 获取不同页面的播放列表和当前列表中歌曲的索引
    getPlayListsAndIndex(ctx, {
      playListIndex,
      playLists
    }) {
      ctx.playLists = playLists
      ctx.playListIndex = playListIndex
    },

    // 设置播放方式 0：顺序， 1： 单曲， 2： 随机
    setPlayWay(ctx) {
      let index = ctx.playWayIndex + 1
      if (index === 3) {
        index = 0
      }
      ctx.playWayIndex = index
      ctx.playWayName = playWay[index]
      // 播放模式设置在缓存中
      wx.setStorageSync('playWayIndex', ctx.playWayIndex)
    },

    // 设置上一首和下一首播放（加上判断不同的播放方式）
    setPlayPreAndNext(ctx, isNext = true) {
      let indexPlayWay = ctx.playWayIndex
      let list = ctx.playLists
      let index = ctx.playListIndex
      switch (indexPlayWay) {
        case 0:
          // 循环
          isNext ? ++index : --index
          if (index === list.length) index = 0
          if (index === -1) index = list.length - 1
          ctx.playListIndex = index
          console.log('循环', ctx.playListIndex);
          break;
        case 1:
          // 单曲
          ctx.playListIndex = index
          ctx.isSingleCirculate = true
          console.log('单曲', ctx.playListIndex);
          break;
        case 2:
          // 随机，随机到同一首继续随机（递归）
          const randomFn = () => {
            ctx.playListIndex = Math.floor(Math.random() * list.length)
          }
          randomFn()
          if (ctx.playListIndex === index) {
            console.log('随机继续');
            randomFn()
          }
          console.log('随机', ctx.playListIndex);
          break;
        default:
          break;
      }
      const id = list[ctx.playListIndex].id
      this.dispatch("getLyricData", { id })
      this.dispatch("isPlayer", true)
    },
  }
})

export {
  audioContext,
  lyricStore
}