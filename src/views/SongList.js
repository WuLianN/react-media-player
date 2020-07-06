import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from '../api/index'
import './SongList.css'

function getSongList(id) {
    return api.getSongList(id)
}

function Songs(props) {
    if (props.songs) {
        return props.songs.map((item, index) => <div className="songs" key={index}>
            <div className="songs-75">{index + 1}</div>
            <div className="songs-75"></div>
            <div className="songs-300">{item.songName}</div>
            <div className="songs-200">{item.artist}</div>
            <div className="songs-200">{item.albumName}</div>
            <div className="songs-100">{item.duration}</div>
        </div>)
    }
    return null
}

export default function SongList() {
    const [songs, setSongs] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        getSongList(id).then(res => {
            const songList = res.data.playlist
            const { trackIds } = songList

            // 登录后能获取全部歌曲，否则用trackIds中的所有id去调用url的接口
            const ids = trackIds.map(item => {
                return item.id
            })

            const standardIds = ids.toString()

            api.getSongDetail(standardIds).then(res => {
                const purifyRes = []
                const result = res.data.songs
                result.forEach(item => {
                    purifyRes.push({
                        id: item.id,
                        songName: item.name,
                        artist: item.ar[0].name,
                        picUrl: item.al.picUrl,
                        albumName: item.al.name,
                        api: 'WY',
                        duration: item.dt
                    })
                })
                setSongs(purifyRes)
            })
        })
    }, [])

    return (<div><Songs songs={songs} /></div>)
}