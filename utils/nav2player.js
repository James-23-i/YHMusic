import { lyricStore } from '../store/index'

export function nav2player(event, _this) {
  const id = event.currentTarget.dataset.id
  const playLists = event.currentTarget.dataset.playlists
  const playListIndex = event.currentTarget.dataset.playlistindex
  // 缓存id，播放列表，播放列表索引，让首页复用
  wx.setStorageSync('playerId', id)
  wx.setStorageSync('playListIndex', playListIndex)
  wx.setStorageSync('playLists', playLists)
  _this.triggerEvent('nav2musicPlay', id)
  // 跳转到播放页并且调用store
  lyricStore.dispatch('getLyricData', { id })
  // 传递播放列表和播放歌曲的索引
  lyricStore.dispatch('getPlayListsAndIndex', { playLists, playListIndex })
}