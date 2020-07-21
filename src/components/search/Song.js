import React from 'react'
import styles from '../../views/SongList.module.css'
import { updateSong, updateSongList, updateIdIndex } from "../../store/actions"
import { useDispatch, useSelector } from "react-redux"
import { formatSec, mapArtist, addZero } from '../../utils/transform'
import cn from 'classnames'

export function Song(props) {
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

    return <div>
        <div className={styles.songs}>
            <div className={styles.songs65}></div>
            <div className={styles.songs95} style={{ textIndent: '16px' }}>来源</div>
            <div className={styles.songs230}>歌曲</div>
            <div className={styles.songs180}>歌手</div>
            <div className={styles.songs180}>专辑</div>
            <div className={cn(styles.songs75, styles.fontSize14)}>时长</div>
        </div >

        {songs.map((item, index) => <div
            className={cn(index === autoIndex && songId === item.id ? styles.color : '', (index + 1) % 2 === 0 ? styles.bg : '', styles.songs)
            }
            key={index} onClick={(e) => update(item, index, e)
            }>
            <div className={styles.songs65}>{addZero(index + 1)}</div>
            <div className={styles.songs95}>{item.api === 'WY' ? '网易云' : 'QQ'}</div>
            <div className={cn(styles.songs230, styles.overflow)}>{item.songName}</div>
            <div className={cn(styles.songs180, styles.overflow)}>{mapArtist(item.artist)}</div>
            <div className={cn(styles.songs180, styles.overflow)}>{item.api === 'WY' ? item.album.name : item.album}</div>
            <div className={cn(styles.songs75, styles.fontSize12)}>{formatSec(item.duration / 1000)}</div>
        </div >)}
    </div >
}

