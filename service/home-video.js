import Request from './request'

function getTopMv(params) {
  return Request.get('/top/mv', params)
}

function getMvUrl(params) {
  return Request.get(`/mv/url?id=${params.id}`)
}

function getVideoDetail(params) {
  return Request.get(`/mv/detail?mvid=${params.id}`)
}

function getRelateVideo(params) {
  return Request.get(`/related/allVideo?id=${params.id}`)
}

export {
  getTopMv,
  getMvUrl,
  getVideoDetail,
  getRelateVideo
}