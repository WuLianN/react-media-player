import React, { useEffect, useState } from "react"
import api from '../../api/wy/index'
import './Snippet.css'
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'
import { useHistory } from "react-router-dom";

const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

export function SnippetExclusive() {
    const [exclusiveVideo, setExclusiveVideo] = useState(null)
    const history = useHistory()

    useEffect(() => {
        // 获取独家推荐 (入口列表)
        api.getSnippetExclusiveVideo().then(res => {
            const result = res.data.result
            let packData = []
            result.forEach(item => {
                packData.push({
                    id: item.id,
                    name: item.name,
                    picUrl: item.sPicUrl,
                    api: 'WY'
                })
            })
            setExclusiveVideo(packData)
        })
    }, [])

    const goVideo = (item,e) => {
        e.preventDefault();
        
        history.push(`/Video/${item.api}/${item.id}`)
    }

    function Exclusive() {
        if (exclusiveVideo) {
            return exclusiveVideo.map((item, index) => (
                <div onClick={(e) => goVideo(item, e)} className="exclusive-video" key={index}>
                    <img className="exclusive-video-img" src={item.picUrl} alt="独家视频" />
                    <span className="exclusive-video-title">{item.name}</span>
                    <div className="exclusive-video-mark">
                        <IconFont type="iconvideosmall" />
                    </div>
                </div>
            )
            )
        }
        return null
    }

    return <div className="exclusive"><Exclusive /></div>
}