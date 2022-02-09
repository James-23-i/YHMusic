// components/recommend-song/recommend-song.js
import { nav2player } from '../../utils/nav2player.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommends: Array
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
      nav2player(event, this)
    },
  }
})
