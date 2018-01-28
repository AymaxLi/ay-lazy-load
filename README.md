# ay-lazy-load
## introduction
a picture lazoy loader via promise

## usage
```javascript
var picList = [
  {
    id: 'a001',
    src: 'https://pbs.twimg.com/media/CyMQcQ3VIAA-Bb8.jpg'
  },
  {
    id: 'a002',
    src: 'https://avatars1.githubusercontent.com/u/19837987?v=4&s=400'
  },
  {
    id: 'a003',
    src: 'https://pbs.twimg.com/profile_images/802137634650763265/NT-UMMTV.jpg'
  },
  {
    id: 'a004',
    src: 'https://avatars0.githubusercontent.com/u/6823863?v=4&s=400'
  }
]

// 每组（趟）加载多少个
var limit = 2

// 每组（趟）超时，单位毫秒
var timeout = 5000

var lazy = initLazy(picList, limit, timeout)

lazy.run()
```