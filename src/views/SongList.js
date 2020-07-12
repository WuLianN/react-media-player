import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from '../api/index'
import './SongList.css'
import { updateSong, updateSongList, updateIdIndex } from "../store/actions"
import { useDispatch, useSelector } from "react-redux"
import { formatSec, mapArtist, addZero } from '../utils/transform'

function getSongList(id) {
    return api.getSongList(id)
}

export default function SongList() {
    const { id } = useParams()
    const dispatch = useDispatch()

    function Songs() {
        const [songs, setSongs] = useState(null)
        const { autoIndex } = useSelector(state => state.updateAutoIndex.autoIndex)
        const { id: songId } = useSelector(state => state.updateSong.song)

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
                            artist: item.ar,
                            album: item.al,
                            api: 'WY',
                            duration: item.dt,
                            picUrl: item.al.picUrl
                        })
                    })
                    setSongs(purifyRes)
                })
            })
        }, [id])

        function update(item, index, e) {
            e.preventDefault();
            let data = item
            let idIndexData = { idIndex: index }
            return dispatch(updateSong(data)) && dispatch(updateIdIndex(idIndexData)) && dispatch(updateSongList({ songList: songs }))
        }

        if (songs) {
            return songs.map((item, index) => <div className="songs" style={index === autoIndex && songId === item.id ? { color: 'red' } : { color: '' }}
                key={index} onClick={(e) => update(item, index, e)
                }>
                <div className="songs-75">{addZero(index + 1)}</div>
                <div className="songs-75"></div>
                <div className="songs-300">{item.songName}</div>
                <div className="songs-200">{mapArtist(item.artist)}</div>
                <div className="songs-200">{item.album.name}</div>
                <div className="songs-100">{formatSec(item.duration / 1000)}</div>
            </div >)
        }
        return null
    }

    return (<div><Songs /></div>)
}

