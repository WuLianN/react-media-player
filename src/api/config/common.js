/*
 * @Description: 配置不同平台的url
 * @Author: your name
 * @Date: 2019-08-26 23:00:59
 * @LastEditTime: 2019-09-03 10:30:04
 * @LastEditors: Please set LastEditors
 */

const baseUrl = 'http://localhost:3001' // 使用本地部署的NeteaseCloudMusicApi
const tencent = `${baseUrl}/tencent`
const kuwo = `${baseUrl}/kuwo`
const wangyiyun = `${baseUrl}`

export { tencent, kuwo, wangyiyun }
