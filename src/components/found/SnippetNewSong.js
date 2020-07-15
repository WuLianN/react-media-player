import React, { useEffect, useState } from "react"
import api from '../../api/wy/index'
import { mapArtist, addZero } from '../../utils/transform'
import { useDispatch } from "react-redux"
import { updateSong, updateIdIndex, updateSongList } from '../../store/actions'

export function SnippetNewSong() {
    const play = require('../../assets/player/play.png')
    const [newSong, setNewSong] = useState(null)
    const dispatch = useDispatch()

    useEffect(() => {
        api.getNewSong().then(res => {
            const data = res.data.result
            let packData = []
            data.forEach(item => {
                const { id, name, picUrl, copywriter } = item
                const { duration, artists, album } = item.song
                const pack = {
                    api: "WY",
                    id,
                    picUrl,
                    copywriter,
                    duration,
                    album,
                    songName: name,
                    artist: artists
                }
                packData.push(pack)
            })

            setNewSong(packData)
        })
    }, [])

    function playSong(item,index) {
        let data = item
        let idIndexData = { idIndex: index }
        return dispatch(updateSong(data)) && dispatch(updateIdIndex(idIndexData)) && dispatch(updateSongList({ songList: newSong }))
    }

    if (newSong) {
        return <div className="newSong">
            {newSong.map((item, index) => <div className="newSong-song" key={index} onClick={() => playSong(item, index)}>
                <div className="newSong-song-index">{addZero(index + 1)}</div>
                <img className="newSong-song-img" src={item.picUrl} alt={item.songName} />
                <div className="newSong-song-detail">
                    <div className="newSong-song-detail-name">{item.songName}</div>
                    <div className="newSong-song-detail-artist">{mapArtist(item.artist)}</div>
                </div>

                <div className="new-song-mark"><img className="new-song-mark-img" src={play} alt="mark" /></div>
            </div>)}
        </div>
    }

    return null
}