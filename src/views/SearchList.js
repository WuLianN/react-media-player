import React, { useEffect, useState } from 'react'
import styles from './SearchList.module.css'
import { useParams } from 'react-router-dom'
import api from '../api/wy/index'
import qqApi from '../api/qq/index'
import List from '../components/search/List'
import axios from 'axios'

export default function SearchList() {
    const { word } = useParams()
    const [songs, setSongs] = useState([])
    const [offset, setOffset] = useState(0)

    function getSearch_WY(word) {
        const type = 1 // 歌曲
        const limit = 30 // 30首
        return api.getSearch(word, type, limit, offset)
    }

    function getSearch_QQ(word) {
        const type = 'song'
        const limit = 30
        return qqApi.getSearch(word, type, limit, offset)
    }

    useEffect(() => {
        let result = []
        let r1 = []
        let r2 = []

        // 并发
        axios.all([getSearch_QQ(word), getSearch_WY(word)]).then(
            axios.spread((QQ, WY) => {
                result.push(QQ.data.data.list)
                result.push(WY.data.result.songs)

                // qq
                result[0].forEach(item => {
                    r1.push({
                        api: 'QQ',
                        id: item.songmid,
                        songName: item.songname,
                        duration: item.interval * 1000,
                        artist: item.singer,
                        album: item.albumname,
                        picUrl: ''
                    })
                })

                // wy
                result[1].forEach(item => {
                    r2.push({
                        api: 'WY',
                        id: item.id,
                        songName: item.name,
                        duration: item.duration,
                        artist: item.artists,
                        album: item.album,
                        picUrl: ''
                    })
                })

                // 合并两个数组
                const r3 = r1.concat(r2)

                // 数组中的对象去重
                let obj = {}
                const r4 = r3.reduce((cur, next) => {
                    if (obj[next.songName] !== '') {
                        obj[next.songName] = true
                        cur.push(next)
                    }
                    return cur
                }, [])

                const allSongs = songs.concat(r4) // 偏移量
                setSongs(allSongs)
            })
        )
    }, [word, offset])

    return <div className={styles.searchList}>
        <div className={styles.searchResult}>

        </div>

        {songs && <List songs={songs} />}
    </div>
}