import {
  playlistStore
} from '../../store/index'

const actionMap = {
  0: 'getHotSongAction',
  1: 'getChinaSongAction',
  2: 'getAntiqueSongAction',
  3: 'getOumeiSongAction',
  4: 'getPopSongAction'
}
const songDataMap = {
  0: 'allSong',
  1: 'chinaSong',
  2: 'antiqueSong',
  3: 'oumeiSong',
  4: 'popSong'
}

// pages/play-list/play-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    playlists: [],

    // songMap: { 0: {}, 1: {}, 2: {}, 3:{}, 4: {} },
    songMap: {},

    // 映射五种类型参数
    pageParamsMap: {
      0: {
        offset: 1,
        limit: 999
      },
      1: {
        offset: 1,
        limit: 999
      },
      2: {
        offset: 1,
        limit: 999
      },
      3: {
        offset: 1,
        limit: 999
      },
      4: {
        offset: 1,
        limit: 9999
      },
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStoreAction()
  },

  getStoreAction() {
    const active = this.data.active
    playlistStore.dispatch(actionMap[active], this.data.pageParamsMap[active])
    playlistStore.onState(songDataMap[active], (res) => {
      const json = {
        ...this.data.songMap,
        [active]: res
      }
      if (res) {
        this.setData({
          songMap: json,
        })
      }
    })
  },

  navToSongItem(params) {
    const id = params.detail
    wx.navigateTo({
      url: `/pages/music-detail/music-detail?id=${id}`,
    })
  },

  onChange(event) {
    const active = event.detail.index
    this.setData({
      active
    })
    this.getStoreAction()
  },
})