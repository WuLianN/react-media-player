import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styles from './Video.module.css'
import api from '../api/wy/index'
import { LeftOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { userControlAudio, updateAudioStatus } from '../store/actions'

export default function Video() {
    const { api: API, id } = useParams()
    const [url, setUrl] = useState(null)
    const [mv, setMv] = useState(null)
    const history = useHistory()
    const dispatch = useDispatch()

    const goBack = () => {
        history.goBack()
    }

    useEffect(() => {
        // 关停音乐
        dispatch(updateAudioStatus({ audioStatus: 'pause' }))
        dispatch(userControlAudio({ userControl: true }))

        const getMvUrl = async (id) => {
            const res = await api.getMVurl(id)
            const url = res.data.data.url
            setUrl(url)
        }

        const getMvDetail = async (id) => {
            const res = await api.getMvDetail(id)
            const result = res.data.data
            const { name, artistName, commentCount, playCount, publishTime, subCount, shareCount, duration } = result
            const packData = {
                name,
                artistName,
                commentCount, // 评论次数
                playCount, // 播放次数
                publishTime, // 发布时间
                subCount, // 订阅次数
                shareCount, // 分享次数
                duration
            }
            setMv(packData)
        }

        if (API === 'WY') {
            getMvUrl(id)
            getMvDetail(id)
        }
    }, [])

    return <div className={styles.video}>
        <div className={styles.left}>
            {mv && <div className={styles.leftHeader}>
                <div onClick={goBack} className={styles.back}><LeftOutlined /></div>
                <span className={styles.mvLogo}>MV</span>
                <span className={styles.name}>{mv.name}</span>
                <span className={styles.artistName}>{mv.artistName}</span>
            </div>}

            {url && <video className={styles.player} controls={true} autoPlay src={url}></video>}
        </div>

        <div className={styles.right}>

        </div>
    </div>
}