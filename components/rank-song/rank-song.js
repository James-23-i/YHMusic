// components/rank-song/rank-song.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songs: Object
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
    navToMusicDetail(options) {
      const idx = options.currentTarget.dataset.idx
      this.triggerEvent('navToMusicDetail', idx)
    },
  }
})
