import React, { useEffect, useState, useMemo, useRef } from 'react'
import cn from 'classnames'
import api from '../../api/wy/index'
import BannerItem from './BannerItem'
import { updateSong } from '../../store/actions'
import styles from './Banner.module.css'
import { useDispatch } from 'react-redux'

const useInterval = (callback, delay) => {
    const savedCallback = useRef(() => { })

    useEffect(() => {
        savedCallback.current = callback
    })

    useEffect(() => {
        if (delay !== null) {
            const interval = setInterval(() => savedCallback.current(), delay || 0)
            return () => clearInterval(interval)
        }

        return undefined
    }, [delay])
}

const TARGET_TYPE = {
    MUSIC: 1,
    ALBUM: 10,
    ARTIST: 100,
    SONG_LIST: 1000,
    USER: 1002,
    MV: 1004,
    LYRIC: 1006,
    BROADCASTING_STATION: 1009,
    VIDEO: 1014
}

const getBanner = () => {
    return api.getBanner(0)
}

const Banner = () => {
    const [currentMid, setCurrentMid] = useState(0)
    const dispatch = useDispatch()
    const [banners, setBanners] = useState(null)

    useEffect(() => {
        getBanner().then(res => {
            const data = res.data.banners
            let packData = []
            data.forEach(item => {
                const { imageUrl, targetId, targetType, url, titleColor, typeTitle } = item
                const pack = {
                    api: "WY",
                    picUrl: imageUrl,
                    targetId,
                    targetType,
                    url,
                    titleColor,
                    typeTitle
                }

                packData.push(pack)
            })
            setBanners(packData)
        })
    }, [])

    useInterval(() => {
        if (!banners) {
            return null
        }
        setCurrentMid((currentMid + 1) % banners.length)
    }, 6000)

    const bannersClassName = useMemo(() => {
        if (banners) {
            const len = banners.length
            const left = (currentMid - 1 + len) % len
            const right = (currentMid + 1) % len
            return {
                [currentMid]: styles.middle,
                [left]: styles.left,
                [right]: styles.right
            }
        }

    }, [currentMid, banners])

    const handleMidChange = (index) => {
        setCurrentMid(index)
    }

    const handleItemClick = (targetType, targetId, e) => {
        e.preventDefault();

        if (targetType === TARGET_TYPE.MUSIC) {
            // 获取歌曲详情
            api.getSongDetail(targetId).then(res => {
                const purifyRes = []
                const result = res.data.songs
                result.forEach(item => {
                    purifyRes.push({
                        id: item.id,
                        songName: item.name,
                        artist: item.ar,
                        album: item.al,
                        api: 'WY',
                        duration: item.dt,
                        picUrl: item.al.picUrl
                    })
                })
                // 更新音乐
                dispatch(updateSong(purifyRes[0]))
            })

        } else if (targetType === TARGET_TYPE.ALBUM) {
        }
    }

    if (banners) {
        return (<div className={styles.root}>
            <div className={styles.banners}>
                {banners.map((item, index) => {
                    const { picUrl, typeTitle, targetId, targetType } = item
                    const className = bannersClassName[index] || styles.hidden
                    // const isMusicType = targetType === TARGET_TYPE.MUSIC

                    return (
                        <BannerItem
                            key={index}
                            bannerIndex={index}
                            typeTitle={typeTitle}
                            imageUrl={picUrl}
                            className={cn(className, styles.enabled)}
                            onClick={(e) => handleItemClick(targetType, targetId, e)}
                        />
                    )
                })}
            </div>
            <div className={styles.dots}>
                {banners.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className={cn(styles.dot, index === currentMid ? styles.active : '')}
                            onMouseOver={() => handleMidChange(index)}
                        />
                    )
                })}
            </div>
        </div>
        )
    }

    return null
}

export default Banner
