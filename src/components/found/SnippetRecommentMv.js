import React, { useEffect, useState } from "react"
import api from '../../api/wy/index'
import './Snippet.css'
import { useHistory } from "react-router-dom";
import { snippetNum } from '../../utils/transform'
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'

const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});


export function SnippetRecommentMv() {
    const [mv, setMv] = useState(null)
    const history = useHistory()

    useEffect(() => {
        async function getRecommentMv() {
            const res = await api.getRecommentMv()
            const result = res.data.result
            let packData = []
            result.forEach((item, index) => {
                if (index < 3) {
                    const { id, name, picUrl, copywriter, playCount, trackCount, duration, artistName } = item
                    const pack = {
                        api: "WY",
                        id,
                        name,
                        picUrl,
                        copywriter,
                        playCount,
                        trackCount,
                        duration,
                        artistName
                    }
                    packData.push(pack)
                }
            })
            setMv(packData)
        }

        getRecommentMv()
    }, [])

    const goVideo = (item, e) => {
        e.preventDefault();

        history.push(`/video/${item.api}/${item.id}`)
    }

    return <div className="recomment-mv-wrap">
        {mv && mv.map((item, index) =>
            <div className="recomment-mv" key={index} onClick={(e) => goVideo(item, e)} >
                <img className="recomment-mv-img" src={item.picUrl} alt={item.name} />
                <div className="recomment-mv-title">{item.name}</div>
                <div className="recomment-mv-artistName">{item.artistName}</div>
                <div className="recomment-mv-mark">
                    <IconFont type="iconvideosmall" />
                    <span>{snippetNum(item.playCount)}</span>
                </div>
            </div>)
        }
    </div >
}