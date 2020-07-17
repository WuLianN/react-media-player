import React from 'react'
import styles from '../../views/SongList.module.css'
import { updateSong, updateSongList, updateIdIndex } from "../../store/actions"
import { useDispatch, useSelector } from "react-redux"
import { formatSec, mapArtist, addZero } from '../../utils/transform'
import cn from 'classnames'

export default function Song(props) {
    const { songs } = props

    const autoIndex = useSelector(state => state.updateAutoIndex.autoIndex)
    const { id: songId } = useSelector(state => state.updateSong.song)
    const dispatch = useDispatch()

    function update(item, index, e) {
        e.preventDefault();
        let data = item
        let idIndexData = { idIndex: index }
        return dispatch(updateSong(data)) && dispatch(updateIdIndex(idIndexData)) && dispatch(updateSongList({ songList: songs }))
    }

    return songs.map((item, index) => <div
        className={cn(
            index === autoIndex && songId === item.id ? styles.color : '',
            (index + 1) % 2 === 0 ? styles.bg : '', styles.songs)
        }
        key={index} onClick={(e) => update(item, index, e)
        }>
        <div className={styles.songs75}>{addZero(index + 1)}</div>
        <div className={styles.songs75}></div>
        <div className={styles.songs300}>{item.songName}</div>
        <div className={styles.songs200}>{mapArtist(item.artist)}</div>
        <div className={styles.songs200}>{item.api === 'WY' ? item.album.name : item.album}</div>
        <div className={styles.songs100}>{formatSec(item.duration / 1000)}</div>
    </div >)
}