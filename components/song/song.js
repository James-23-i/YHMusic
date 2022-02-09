// components/hot-song/hot-song.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    song: Array,
    songWidth: Number
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
    songItemToDetail(event) {
      const id = event.currentTarget.dataset.id
      this.triggerEvent('navToSongDetail', id)
    },
  }
})
