import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from '../api/wy/index'
import qqApi from '../api/qq/index'
// import './SongList.css'
import { updateSong, updateSongList, updateIdIndex } from "../store/actions"
import { useDispatch, useSelector } from "react-redux"
import { formatSec, mapArtist, addZero } from '../utils/transform'
import cn from 'classnames'
import styles from './SongList.module.css'

function getSongList_WY(id) {
    return api.getSongList(id)
}

function getSongList_QQ(id) {
    return qqApi.getSongList(id, 1)
}

export default function SongList() {
    const { api: API, id } = useParams()

    const dispatch = useDispatch()

    function Songs() {
        const [songs, setSongs] = useState(null)
        const autoIndex = useSelector(state => state.updateAutoIndex.autoIndex)
        const { id: songId } = useSelector(state => state.updateSong.song)

        useEffect(() => {
            if (API === 'WY') {
                getSongList_WY(id).then(res => {
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

            } else if (API === 'QQ') {
                getSongList_QQ(id).then(res => {
                    // console.log(res.data)
                    const purifyRes = []
                    const result = res.data.data
                    result.forEach(item => {
                        purifyRes.push({
                            id: item.id,
                            songName: item.name,
                            artist: item.singer,
                            album: '',
                            api: 'QQ',
                            duration: item.time * 1000,
                            picUrl: item.pic
                        })
                    })
                    setSongs(purifyRes)
                })
            }
        }, [id, API])

        function update(item, index, e) {
            e.preventDefault();
            let data = item
            let idIndexData = { idIndex: index }
            return dispatch(updateSong(data)) && dispatch(updateIdIndex(idIndexData)) && dispatch(updateSongList({ songList: songs }))
        }

        if (songs) {
            return songs.map((item, index) => <div
                className={cn(index === autoIndex && songId === item.id ? styles.color : '', (index + 1) % 2 === 0 ? styles.bg : '', styles.songs)
                }
                key={index} onClick={(e) => update(item, index, e)
                }>
                <div className={styles.songs75}>{addZero(index + 1)}</div>
                <div className={styles.songs75}></div>
                <div className={styles.songs300}>{item.songName}</div>
                <div className={styles.songs200}>{item.api === 'WY' ? mapArtist(item.artist) : item.artist}</div>
                <div className={styles.songs200}>{item.album.name}</div>
                <div className={styles.songs100}>{formatSec(item.duration / 1000)}</div>
            </div >)
        }
        return null
    }

    return (<div><Songs /></div>)
}

