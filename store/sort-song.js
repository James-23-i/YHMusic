import { HYEventStore } from "hy-event-store"
import { getSortSong } from '../service/home-music'

// 定义歌曲排行映射 （0 新歌，1 推荐，2 原创， 3 飙升）
const songMap = { 0: 'newSong', 1: 'recommendSong', 2: 'originSong', 3: 'upSong' }

const songStore = new HYEventStore({
  state: {
    newSong: null,
    recommendSong: null,
    originSong: null,
    upSong: null
  },
  actions: {
    getSortSong(ctx) {
      // 四种类型进行遍历
      for (let i = 0; i < 4; i++) {
        getSortSong(i).then(res => {
          const songName = songMap[i]
          ctx[songName] = res.playlist
        })
      }
    }
  }
})

export {
  songStore,
  songMap
}