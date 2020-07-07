import { tencent, kuwo, wangyiyun } from './common'

export default {
  WY: (id) => {
    return `${wangyiyun}/url?id=${id}`

  },

  QQ: (id) => {
    return `${tencent}/url?id=${id}`

  },

  KW: (id) => {
    return `${kuwo}/url?id=${id}`
  }
}
