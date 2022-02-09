import Request from '../service/request'

function getDetailMusicPlayer(ids) {
  return Request.get('/song/detail', {
    ids
  })
}

function getMusicLyric(id) {
  return Request.get('/lyric', {
    id
  })
}

export {
  getMusicLyric,
  getDetailMusicPlayer
}