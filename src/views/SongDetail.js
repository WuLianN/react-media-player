import React, { useState, useEffect, useRef } from "react"
import styles from './SongDetail.module.css'
import { HeartOutlined, FolderAddOutlined, DownloadOutlined, ShareAltOutlined, ShrinkOutlined, RotateLeftOutlined } from '@ant-design/icons'
import { getPic } from '../api/config/other'
import { mapArtist } from '../utils/transform'
import { useSelector } from 'react-redux'

export default function SongDetail(props) {
    // 当鼠标置于图片上，isShowImg为true，进入SongDetail，isShowImg被赋值为false，这就导致SongDetail重复渲染。我们等isShowImg为false再渲染
    const { showSongDetail, songData, isShowImg } = props
    const { id, api, picUrl, artist, songName, album } = songData

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
            <img className={styles.mainRecordImg} src={picUrl ? picUrl : getPic(api, id)} alt="背景图" />
        </div >
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
                        <span>专辑：{api === 'WY' ? album.name : album}</span>
                        <span>歌手：{mapArtist(artist)}</span>
                    </div>
                </div>

            </div>

            <div className={styles.mainOther}>
                <div className={styles.mainOtherBtn} onClick={() => showSongDetail(false)}>
                    <ShrinkOutlined className={styles.mainOtherBtnImg} />
                </div>
            </div>

            <img className={styles.filterImg} src={picUrl ? picUrl : getPic(api, id)} alt="背景图" />
        </div>

    </div>
}


