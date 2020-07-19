import { tencent, wangyiyun } from './common'

export function getPic(api, id) {
    if (api === 'WY') {
        return `${wangyiyun}/pic?id=${id}}`
    } else if (api === 'QQ') {
        return `${tencent}/pic?id=${id}`
    }
}