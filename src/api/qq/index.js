/*
 * @Description: QQ音乐 api 鼻子亲了脸
 * @Author: WuLianN
 * @Date: 2019-08-13 10:54:21
 * @LastEditTime: 2019-08-22 18:52:14
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios'

import {
  userSongList,
  songList,
  lrc,
  url,
  search
} from './source'

export default {
  /**
     * @description: 音乐用户歌单
     * @param uid userId
     * @return:
     */

  getUserSongList(uid) {
    return axios.get(userSongList, {
      params: {
        uid: uid
      }
    })
  },

  /**
     * @description: 音乐歌单
     * @param id 音乐id
     * @param format 格式化
     * @return:
     */

  getSongList(id, format) {
    return axios.get(songList, {
      params: {
        id: id,
        format: format
      }
    })
  },

  /**
    * @description: 音乐歌词
    * @param id 音乐ID
    * @return:
    */

  getLrc(id) {
    return axios.get(lrc, {
      params: {
        id: id
      }
    })
  },

  /**
  * @description: 音乐播放地址
  * @param id 音乐ID
  * @return:
  */
  getUrl(id) {
    return axios.get(url, {
      params: {
        id: id
      }
    })
  },

  /**
    * @description: 搜索音乐
    * @param keywords 关键词
    * @param type 类型  song singer album songList video radio user lrc
    * @param pageSize 条数
    * @return:
    */

  getSearch(keywords, type, pageSize, page) {
    return axios.get(search, {
      params: {
        keyword: keywords,
        type: type,
        pageSize: pageSize,
        page: page
      }
    })
  },
}


