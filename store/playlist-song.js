import {
  HYEventStore
} from "hy-event-store"
import {
  getHotSong,
  getChinaSong,
  getAntiqueSong,
  getOumeiSong,
  getPopSong
} from '../service/home-music'

const playlistStore = new HYEventStore({
  state: {
    // 存放 { more, playlists }
    allSong: null,
    chinaSong: null,
    antiqueSong: null,
    oumeiSong: null,
    popSong: null
  },
  actions: {
    getHotSongAction(ctx, payload) {
      // payload 参数 cat, limit, offset
      getHotSong(payload).then(res => {
        if (res) {
          ctx.allSong = {
            more: res.more,
            playlists: res.playlists
          }
        }
      })
    },

    getChinaSongAction(ctx, payload) {
      getChinaSong(payload).then(res => {
        if (res) {
          ctx.chinaSong = {
            more: res.more,
            playlists: res.playlists
          }
        }
      })
    },

    getAntiqueSongAction(ctx, payload) {
      getAntiqueSong(payload).then(res => {
        if (res) {
          ctx.antiqueSong = {
            more: res.more,
            playlists: res.playlists
          }
        }
      })
    },

    getOumeiSongAction(ctx, payload) {
      getOumeiSong(payload).then(res => {
        if (res) {
          ctx.oumeiSong = {
            more: res.more,
            playlists: res.playlists
          }
        }
      })
    },

    getPopSongAction(ctx, payload) {
      getPopSong(payload).then(res => {
        if (res) {
          ctx.popSong = {
            more: res.more,
            playlists: res.playlists
          }
        }
      })
    },
  }
})

export {
  playlistStore
}