import React, { useEffect, useState } from 'react'
import api from '../api/wy/index'
import { useDispatch } from 'react-redux'
import { updateSong, updateIdIndex, updateSongList } from '../store/actions'
import cookie from '../utils/cookie'
import { Result, Button } from 'antd'
import { useHistory } from 'react-router-dom'

export default function FM() {
    const dispatch = useDispatch()
    const hasLogin = cookie.getCookie('MUSIC_U')
    const history = useHistory()

    useEffect(() => {
        const getFM = async () => {
            const res = await api.getFM()
            const result = res.data.data
            let packData = []
            result.forEach(item => {
                packData.push({
                    api: 'WY',
                    id: item.id,
                    artist: item.artists,
                    songName: item.name,
                    album: item.album,
                    picUrl: item.album.picUrl,
                    duration: item.duration
                })
            })

            dispatch(updateSong(packData[0]))
            dispatch(updateIdIndex({ idIndex: 0 }))
            dispatch(updateSongList({ songList: packData }))
        }

        if (hasLogin) {
            getFM()
        }
    }, [])

    const goBack = () => {
        history.push('/found')
    }

    if (!hasLogin) {

        return <Result
            status="403"
            title="403"
            subTitle="需要登录！！！"
            extra={<Button type="primary" onClick={goBack}>回到首页</Button>}
        />
    }

    return null
}