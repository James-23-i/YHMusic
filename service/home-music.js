import Request from './request'

function getMusicBanner(params) {
  return Request.get('/banner', params)
}

function getSortSong(idx) {
  return Request.get('/top/list', {
    idx
  })
}

function getHotSong(params) {
  const _params = {cat: "全部", ...params}
  return Request.get('/top/playlist', _params)
}

function getChinaSong(params) {
  const _params = {cat: "华语", ...params}
  return Request.get('/top/playlist', _params)
}

function getAntiqueSong(params) {
  const _params = {cat: "古风", ...params}
  return Request.get('/top/playlist', _params)
}

function getOumeiSong(params) {
  const _params = {cat: "欧美", ...params}
  return Request.get('/top/playlist', _params)
}

function getPopSong(params) {
  const _params = {cat: "流行", ...params}
  return Request.get('/top/playlist', _params)
}

function getSongItemDetail(id) {
  return Request.get('/playlist/detail/dynamic', {id})
}

export {
  getMusicBanner,
  getSortSong,
  getHotSong,
  getChinaSong,
  getAntiqueSong,
  getOumeiSong,
  getPopSong,
  getSongItemDetail
}