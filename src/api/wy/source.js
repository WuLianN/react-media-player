/*
 * @Description: 网易云音乐 NeteaseCloudMusicApi
 * @Author: WuLianN
 * @Date: 2019-08-07 13:59:55
 * @LastEditTime: 2019-10-12 17:58:50
 * @LastEditors: Please set LastEditors
 */

let env = process.env.REACT_APP_ENV
let proxyUrl

if (env === 'DEV') {
  proxyUrl = '/Netease'
} else if (env === 'PROD') {
  proxyUrl = 'http://localhost:3001'
}

const api = {
  // 网易云音乐
  search: `${proxyUrl}/search`, // 搜索
  url: `${proxyUrl}/song/url`, // 音乐播放地址
  lrc: `${proxyUrl}/lyric`, // 音乐歌词
  banner: `${proxyUrl}/banner`, // 首页轮播图
  mvTop: `${proxyUrl}/top/mv`, // MV排行榜
  mvUrl: `${proxyUrl}/mv/url`, // mv 地址
  recommentList: `${proxyUrl}/personalized`, // 推荐歌单
  songList: `${proxyUrl}/playlist/detail`, // 音乐歌单
  songDetail: `${proxyUrl}/song/detail`,
  album: `${proxyUrl}/album`, // 首页轮播图专辑
  hotSongList: `${proxyUrl}/top/playlist`, // 热门歌单
  highQuality: `${proxyUrl}/top/playlist/highquality`, // 精品歌单
  singerAlbum: `${proxyUrl}/artist/album`, // 歌手专辑
  singerSongList: `${proxyUrl}/artists`, // 歌手歌曲
  singerMV: `${proxyUrl}/artist/mv`, // 歌手MV
  singerInfo: `${proxyUrl}/artist/desc`, // 歌手信息
  singerRankList: `${proxyUrl}/toplist/artist`, // 歌手排行榜
  songListComment: `${proxyUrl}/comment/playlist`, // 歌单评论
  userSongList: `${proxyUrl}/user/playlist`, // 用户歌单信息
  rankList: `${proxyUrl}/top/list`, // 排行榜
  rankListDetail: `${proxyUrl}/toplist/detail`, // 所有榜单内容摘要
  topAlbum: `${proxyUrl}/top/album`, // 新碟上架
  newSong: `${proxyUrl}/personalized/newsong`, // 推荐新音乐
  topSong: `${proxyUrl}/top/song`, // 新歌速递
  topList: `${proxyUrl}/toplist`, // 所有榜单
  snippetExclusiveVideo: `${proxyUrl}/personalized/privatecontent`, // 独家放送(入口列表)
  exclusiveVideo: `${proxyUrl}/personalized/privatecontent/list`, // 独家放送列表
  cellPhoneLogin: `${proxyUrl}/login/cellphone`, // 手机登录
  logout: `${proxyUrl}/logout`, // 退出登录
  loginStatus: `${proxyUrl}/login/status`, // 登录状态
  userDetail: `${proxyUrl}/user/detail`, // 用户详情
  recommentSongs: `${proxyUrl}/recommend/songs`, // 每日推荐歌曲
  recommentSongList: `${proxyUrl}/recommend/resource`, // 每日推荐歌单 
  recommentMv: `${proxyUrl}/personalized/mv`, // 推荐 mv
  mvDetail: `${proxyUrl}/mv/detail`, //   获取 mv 数据
  fm: `${proxyUrl}/personal_fm`
}

export const search = api.search
export const url = api.url
export const pic = api.pic
export const lrc = api.lrc
export const banner = api.banner
export const recommentList = api.recommentList
export const mvUrl = api.mvUrl
export const album = api.album
export const hotSongList = api.hotSongList
export const highQualityList = api.highQuality
export const songList = api.songList
export const songDetail = api.songDetail
export const singerAlbum = api.singerAlbum
export const singerSongList = api.singerSongList
export const singerMV = api.singerMV
export const singerInfo = api.singerInfo
export const singerRankList = api.singerRankList
export const songListComment = api.songListComment
export const userSongList = api.userSongList
export const mvTop = api.mvTop
export const rankList = api.rankList
export const rankListDetail = api.rankListDetail
export const topAlbum = api.topAlbum
export const newSong = api.newSong
export const topSong = api.topSong
export const topList = api.topList
export const snippetExclusiveVideo = api.snippetExclusiveVideo
export const exclusiveVideo = api.exclusiveVideo
export const cellPhoneLogin = api.cellPhoneLogin
export const logout = api.logout
export const loginStatus = api.loginStatus
export const userDetail = api.userDetail
export const recommentSongs = api.recommentSongs
export const recommentSongList = api.recommentSongList
export const recommentMv = api.recommentMv
export const mvDetail = api.mvDetail
export const fm = api.fm