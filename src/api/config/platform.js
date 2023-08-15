import { tencent, kuwo, wangyiyun } from './common'
import NeteaseCloudMusicApi from '../wy/index'

export default {
  WY: async (id) => {
    const { data } = await NeteaseCloudMusicApi.getUrl(id)
    if (data.code === 200 && data.data && data.data.length > 0) {
      return data.data[0].url
    }
    // return `${wangyiyun}/url?id=${id}`
  },

  QQ: (id) => {
    return `${tencent}/url?id=${id}`

  },

  KW: (id) => {
    return `${kuwo}/url?id=${id}`
  }
}
