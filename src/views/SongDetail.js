import React, { useState, useEffect, useRef } from "react"
import styles from './SongDetail.module.css'
import { HeartOutlined, FolderAddOutlined, DownloadOutlined, ShareAltOutlined, ShrinkOutlined, RotateLeftOutlined } from '@ant-design/icons'
import { getPic } from '../api/config/other'
import { mapArtist, formatSec, reverseFormatSec } from '../utils/transform'
import { useSelector } from 'react-redux'
import api from '../api/wy/index'
import qqApi from '../api/qq/index'

export default function SongDetail(props) {
    // 当鼠标置于图片上，isShowImg为true，进入SongDetail，isShowImg被赋值为false，这就导致SongDetail重复渲染。我们等isShowImg为false再渲染
    const { showSongDetail, songData, isShowImg } = props
    const { id, api: API, picUrl, artist, songName, album } = songData

    function Record() {
        const audioStatus = useSelector(state => state.updateAudioStatus.audioStatus)
        const [angle, setAngle] = useState(0)

        useEffect(() => {
            let interval

            if (audioStatus === 'play') {
                interval = setInterval(() => {
                    setAngle((angle) => angle + 1)
                }, 100)
            } else if (audioStatus === 'pause') {
                clearInterval(interval)
            }

            return () => clearInterval(interval)
        }, [audioStatus])


        return <div style={audioStatus && { transform: `rotate(${angle}deg)` }}
            className={styles.mainRecord} >
            <img className={styles.mainRecordImg} src={picUrl ? picUrl : getPic(API, id)} alt="背景图" />
        </div >
    }

    function Lyric() {
        const [lyric, setLyric] = useState([])
        const [listHeight, setListHeight] = useState(0) // 列表总高度
        const itemSize = 45 // 每项高度
        const visialCount = 9 // 可显示的列表项数
        const start = 0 // 起始索引
        const end = start + visialCount // 结束索引
        const list = useRef(null)

        const [control, setControl] = useState(false)

        const [middle, setMiddle] = useState(Math.floor((start + end) / 2)) // 中间索引

        useEffect(() => {
            const getLyric_WY = async () => {
                const res = await api.getLrc(id)
                if (res.data.lrc) {
                    const result = res.data.lrc.lyric
                    const resultSplit = result.split('\n')
                    let lyrics = []
                    resultSplit.forEach(ele => {
                        const res = ele.split(']')
                        const time = res[0].slice(1, 6)
                        const lyric = res[1]

                        lyrics.push({
                            time: time,
                            lyric: lyric
                        })
                    })

                    setLyric(lyrics)
                    setControl(true)
                    setListHeight(lyrics.length * itemSize)
                }
            }

            const getLyric_QQ = async (id) => {
                return qqApi.getLrc(id)
            }

            // 获取歌词
            if (API === 'WY') {
                getLyric_WY()
            } else if (API === 'QQ') {

            }
        }, [])

        // 获取currentTime
        const { currentTime } = useSelector(state => state.updateCurrentTime.currentTime)

        const isProgressControl = false // 进度条控制，进度条操控currentTime，还没有实现，先留个口

        useEffect(() => {
            if (control) {
                const formatSecTime = formatSec(Math.floor(currentTime))

                if (isProgressControl) {

                } else {
                    if (formatSecTime === lyric[middle].time) {
                        getScrollTop(itemSize * (middle - 4))
                        // 更新middle
                        setMiddle((middle) => middle + 1)
                    }
                }
            }
        }, [currentTime])

        function scrollEvent() {
            //当前滚动位置
            let scrollTop = list.scrollTop;
            //此时的开始索引
            const start = Math.floor(scrollTop / itemSize);
            //此时的结束索引
            const end = start + visialCount;
            //此时的偏移量
            const startOffset = scrollTop - (scrollTop % itemSize);

            // 计算最中间的索引
            const middle = Math.floor((start + end) / 2);

        }

        // 偏移量
        function getScrollTop(startOffset) {
            list.current.scrollTop = startOffset
        }

        return <div ref={list} className={styles.infiniteList} onScroll={scrollEvent}  >
            <div className={styles.infiniteListPhantom} style={{ height: listHeight + 'px' }}></div>
            {
                lyric.map((item, index) => <div key={index} className={styles.infiniteListItem}
                    style={
                        Math.floor(currentTime) >= reverseFormatSec(item.time) &&
                            Math.floor(currentTime) < reverseFormatSec(lyric[index + 1].time) ? { color: 'white' } : {}
                    }
                >{item.lyric}</div>)
            }
        </ div >
    }

    return !isShowImg && <div className={styles.songDetail}>
        <div className={styles.main}>
            <div className={styles.mainLeft}>
                <div className={styles.mainRecordWrap}>
                    <Record />
                </div>
                <div className={styles.mainControls}>
                    <div className={styles.mainControlsBox}>
                        <HeartOutlined />
                        <span className={styles.mainControlsText}>喜欢</span>
                    </div>
                    <div className={styles.mainControlsBox}>
                        <FolderAddOutlined />
                        <span className={styles.mainControlsText}>收藏</span>
                    </div>
                    <div className={styles.mainControlsBox}>
                        <DownloadOutlined />
                        <span className={styles.mainControlsText}>下载</span>
                    </div>
                    <div className={styles.mainControlsBox}>
                        <ShareAltOutlined />
                        <span className={styles.mainControlsText}>分享</span>
                    </div>
                </div>
            </div>

            <div className={styles.mainRight}>
                <div className={styles.mainSong}>
                    <div className={styles.mainSongName}>{songName}</div>
                    <div className={styles.mainSongInfo}>
                        <span>专辑：{API === 'WY' ? album.name : album}</span>
                        <span>歌手：{mapArtist(artist)}</span>
                    </div>
                </div>

                <Lyric />
            </div>

            <div className={styles.mainOther}>
                <div className={styles.mainOtherBtn} onClick={() => showSongDetail(false)}>
                    <ShrinkOutlined className={styles.mainOtherBtnImg} />
                </div>
            </div>

            <img className={styles.filterImg} src={picUrl ? picUrl : getPic(API, id)} alt="背景图" />
        </div >

    </div >
}


