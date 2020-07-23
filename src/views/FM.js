import React, { useEffect, useState } from 'react'
import api from '../api/wy/index'
import { useDispatch } from 'react-redux'
import { updateSong, updateIdIndex, updateSongList } from '../store/actions'
import cookie from '../utils/cookie'

export default function FM() {
    const dispatch = useDispatch()
    const hasLogin = cookie.getCookie('MUSIC_U')

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
    return null
}