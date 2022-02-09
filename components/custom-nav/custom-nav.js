// components/custom-nav/custom-nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    current: Number
  },

  /** 
   * 使用多个插槽
  */
  options: {
    multipleSlots: true
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
    navToHomeMusic() {
      this.triggerEvent('nav')
    },
  }
})
