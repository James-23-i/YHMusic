// import { lyricStore } from '../../store/index'
import { nav2player } from '../../utils/nav2player.js'
// components/song-detail/song-detail.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songDetail: Array,
    name: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    nav2musicPlay(event) {
      // const id = event.currentTarget.dataset.id
      // this.triggerEvent('nav2musicPlay', id)
      // // 跳转到播放页并且调用store
      // lyricStore.dispatch('getLyricData', id)
      nav2player(event, this)
    },
  }
})
