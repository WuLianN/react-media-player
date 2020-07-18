import React, { useEffect, useState } from "react"
import api from '../../api/wy/index'
import './Snippet.css'
import { useHistory } from "react-router-dom";
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'
import { snippetNum } from '../../utils/transform'

const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

function getRecommentList() {
    return api.getRecommentList(10)
}

function List(props) {
    let history = useHistory();

    function goSongList(item, e) {
        e.preventDefault();
        const { id, api } = item
        history.push(`/songList/${api}/${id}`);
    }

    console.log(props)
    if (props.recommentList) {
        return props.recommentList.map((item, index) =>
            <div className="recommentlist" key={index} onClick={(e) => goSongList(item, e)}>
                <img className="recommentlist-img" src={item.picUrl} alt={item.name} />
                <div className="recommentList-title">{item.name}</div>
                <div className="recommentList-mark">
                    <IconFont type="iconerji" />
                    <span>{snippetNum(item.playCount)}</span>
                </div>
            </div>
        )
    }

    return null
}

export function SnippetRecommentList() {
    const [recommentList, setRecommentList] = useState(null)

    useEffect(() => {
        getRecommentList().then(res => {
            const data = res.data.result
            let packData = []
            data.forEach(item => {
                const { id, name, picUrl, copywriter, playCount, trackCount } = item
                const pack = {
                    api: "WY",
                    id,
                    name,
                    picUrl,
                    copywriter,
                    playCount,
                    trackCount
                }
                packData.push(pack)
            })
            setRecommentList(packData)
        })
    }, [])

    return (<div className="recommentList-wrap"><List recommentList={recommentList} /></div>)

}