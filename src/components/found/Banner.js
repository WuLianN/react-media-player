import React, { useEffect, useState, useMemo, useRef } from 'react'
import cn from 'classnames'
import api from '../../api/index'
import BannerItem from './BannerItem'

import styles from './Banner.module.css'

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

            console.log(packData)
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

    const handleItemClick = (musicId) => {

    }

    if (banners) {
        return (<div className={styles.root}>
            <div className={styles.banners}>
                {banners.map((item, index) => {
                    const { picUrl, typeTitle, targetId, targetType } = item
                    const className = bannersClassName[index] || styles.hidden
                    const isMusicType = targetType === TARGET_TYPE.MUSIC

                    return (
                        <BannerItem
                            bannerIndex={index}
                            typeTitle={typeTitle}
                            imageUrl={picUrl}
                            className={cn(className, isMusicType && styles.enabled)}
                            onClick={isMusicType ? () => handleItemClick(targetId) : undefined}
                        />
                    )
                })}
            </div>
            <div className={styles.dots}>
                {banners.map(({ imageUrl }, index) => {
                    return (
                        <div
                            key={imageUrl}
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
