import React, { useEffect, useState, useMemo } from "react"
import api from '../../api/wy/index'
import './Snippet.css'
import { useHistory } from "react-router-dom";
import { createFromIconfontCN } from '@ant-design/icons';
import { iconFontUrl } from '../../utils/config'
import { snippetNum } from '../../utils/transform'
import cookie from '../../utils/cookie'

const IconFont = createFromIconfontCN({
    scriptUrl: iconFontUrl, // 在 iconfont.cn 上生成
});

function List(props) {
    let history = useHistory();
    function goSongList(item, e) {
        e.preventDefault();
        const { id, api } = item
        history.push(`/songList/${api}/${id}`);
    }

    function MapList(props) {
        const { list, hasLogin } = props
        const play = require('../../assets/player/play.png')
        const [isShowImg, setIsShowImg] = useState(false)
        const [_index, set_Index] = useState(null)
        const [_list, set_List] = useState(list)

        useMemo(() => {
            if (hasLogin) {
                const sliceList = list.slice(0, 9)
                set_List(sliceList)
            }
        }, [hasLogin])

        const showMask = (bool, index, e) => {
            e.preventDefault()
            setIsShowImg(bool)
            set_Index(index)
        }

        return _list.map((item, index) => <div className="recommentlist" key={index} onClick={(e) => goSongList(item, e)}>
            <img onMouseEnter={(e) => showMask(true, index, e)}
                onMouseLeave={(e) => showMask(false, index, e)}
                className="recommentlist-img" src={item.picUrl} alt={item.name} />
            <div className="recommentList-title">{item.name}</div>
            <div className="recommentList-mark">
                <IconFont type="iconerji" />
                <span>{snippetNum(item.playCount)}</span>
            </div>
            <div style={_index === index && isShowImg ? { display: 'block' } : { display: 'none' }} className="recommentList-mouseMask">
                <img className="recommentList-mouseMaskImg" src={play} alt="mark" />
            </div>
        </div>)
    }

    const day2cn = {
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '日',
    }

    const list = props.recommentList

    if (list) {
        // 检查是否登录 -> 获取每日推荐歌曲
        const hasLogin = cookie.getCookie('MUSIC_U')

        if (hasLogin) {
            // 去掉一个 补为 每日推荐
            const day = new Date().getDay()
            const date = new Date().getDate()
            const recommentData = {
                api: 'WY',
                id: -1
            }

            return (
                <>
                    <div className="recommentlist" onClick={(e) => goSongList(recommentData, e)}>
                        <div className="recommentlist-img recommentList-border">
                            <div className="recommentList-day">星期{day2cn[day]}</div>
                            <div className="recommentList-date">{date}</div>
                        </div>
                        <div className="recommentList-title">每日推荐歌曲</div>
                    </div>
                    <MapList list={list} hasLogin={hasLogin} />
                </>)
        } else {
            return <MapList list={list} hasLogin={hasLogin} />
        }
    }

    return null
}

export function SnippetRecommentList() {
    const [recommentList, setRecommentList] = useState(null)

    useEffect(() => {
        async function getRecommentList(count) {
            const res = await api.getRecommentList(count)
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
        }

        getRecommentList(10)

    }, [])

    return (<div className="recommentList-wrap">
        <List recommentList={recommentList} />
    </div>)

}


