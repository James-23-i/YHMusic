import Request from './request'

function getSesarchList() {
  return Request.get('/search/hot')
}

function getSesarchSuggest(keywords) {
  return Request.get('/search/suggest', {
    keywords,
    type: 'mobile'
  })
}

function getSearch(keywords) {
  return Request.get('/search', {
    keywords
  })
}

export {
  getSesarchList,
  getSesarchSuggest,
  getSearch
}