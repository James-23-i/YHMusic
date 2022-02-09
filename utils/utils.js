export function queryRect(queryDom) {
  return new Promise((resolve) => {
    const query = wx.createSelectorQuery()
    query.select(queryDom).boundingClientRect()    // 获取组件本身 rect 矩形内部属性
    query.exec(function(res){
      resolve(res)
    })
  })
}

export function lyricParse(lyricText) {
  // 通过切割转换为数组
  const lyricArr = lyricText.split("\n")
  // 定义正则表达式取出时间和对应的歌词 [00:00.749]
  const textReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  const arr = []
  lyricArr.map(item => {
    // 匹配出时间
    const regTime = textReg.exec(item)
    // 替换text
    const text = item.replace(textReg, "")
    let minute
    let second
    let mini
    let allTime
    if (regTime) {
      minute = regTime[1] * 60 * 1000
      second = regTime[2] * 1000
      mini = regTime[3].length === 3 ? regTime[3] * 1 : regTime[3] * 10
    }
    allTime = minute + second + mini
    const obj = { allTime, text }
    arr.push(obj)
  })
  return arr
}

export function debounce(fn, delay = 500, immediate = false, resultCallback) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null
  let isInvoke = false

  // 2.真正执行的函数
  const _debounce = function(...args) {
    return new Promise((resolve, reject) => {
      // 取消上一次的定时器
      if (timer) clearTimeout(timer)

      // 判断是否需要立即执行
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        isInvoke = true
      } else {
        // 延迟执行
        timer = setTimeout(() => {
          // 外部传入的真正要执行的函数
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  }

  // 封装取消功能
  _debounce.cancel = function() {
    console.log(timer)
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}