// components/video-list/video-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    videoList: Array
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
    navToMvDetail(event) {
      const id = event.currentTarget.dataset.item.id
      // 子传父
      this.triggerEvent('changeNavTo', id)
    }
  }
})
