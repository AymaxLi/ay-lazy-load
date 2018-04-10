// 总容器
const contaienr = document.querySelector('#lazyAymax')

/**
 * 图片懒加载
 * @param {Array} picList 图片数组
 * @param {Integer} limit 每次加载数量
 * @param {Integer} timeout 每组最长加载时间
 * 
 */
function initLazy (picList, limit, timeout) {

  // 图片分组
  let picChunk = chunk(picList, limit)

  /**
   * 将数组拆分成若干长度为 limit 的数组
   * @param {Array} arr 数组
   * @param {Integer} limit 每组个数
   */
  function chunk (arr, limit) {
    let chunkArr = []
    for (var i = 0; i < Math.ceil(arr.length / limit); i++) {
      chunkArr.push(arr.slice(limit * i, limit * ( i + 1 )))
    }
    return chunkArr
  }

  /**
   * 新建 promise 对象
   * @param {Object} el 图片对象
   * @param {Integer} index 下标
   * @param {Array} arr 图片对象数组
   */
  function newPromise (el, index, arr) {
    return new Promise(resolve => {
      // 判空
      if (!el) return false

      // 计数
      let flag = 0

      // 超时
      let timer = setTimeout(_ => {
        console.log('超时')
        resolve()
      }, timeout)

      // 插入 img
      el.forEach(pic => {
        let img = document.createElement("img")
        contaienr.appendChild(img)
        img.src = pic.src
        img.onload = _ => {
          console.log(pic.id)
          if (++ flag === limit) {
            clearTimeout(timer)
            resolve()
          }  
        }
      })
    })
  }

  return {
    run: _ => {
      // 串行执行每个 chunk 的 promise
      picChunk.reduce((pre, cur) => pre.then(_ => newPromise(cur)), Promise.resolve())

      // 上面是简略写法
      // picChunk.reduce(function (pre, cur) {
      //   return pre.then(function () {
      //     return newPromise(cur)
      //   })
      // }, Promise.resolve())


    // 下面方法弃用

    //   // 拼接代码
    //   let codeStr = 'firstPromise'
    //   picChunk.forEach((el, index) => {
    //     // el.then(_ => console.log(`第 ${index + 1} 组 ok`))
    //     codeStr += `.then(_ => {console.log("第 ${index + 1} 组 ok");return newPromise(picChunk[${index + 1}])})`
    //   })

    //   // 用函数构造器构造函数并立即执行
    //   new Function('firstPromise', 'newPromise', 'picChunk', codeStr)(newPromise(picChunk[0]), newPromise, picChunk)
    }
  }
}
