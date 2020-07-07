import React, { useRef } from "react";
import { useSelector, useDispatch, useStore } from 'react-redux'
import platform from '../api/config/platform'
import { updateIdIndex } from "../store/actions";

function play(id, api, audio) {
    const source = platform[api](id)
    audio.current.src = source
    audio.current.play()
}

export default function Audio() {
    const { id, api } = useSelector(state => state.updateSong.song)
    const { songList } = useSelector(state => state.updateSongList.songList)
    const { idIndex } = useSelector(state => state.updateIdIndex.idIndex)
    const dispatch = useDispatch()
    const audio = useRef(null)

    const store = useStore()
    console.log(store)

    if (audio.current) {
        audio.current.onplay = () => {
        }

        audio.current.onended = () => {
            getNextSong(idIndex, songList, audio)
        }
    }

    function getNextSong(idIndex, songList, audio) {
        if (songList && idIndex) {
            // 重新播放
            if (idIndex === songList.length - 1) {
                // idIndex = -1
                dispatch(updateIdIndex(-1))
            }

            const nextIdIndex = idIndex + 1
            const nextSongId = songList[idIndex + 1].id

            play(nextSongId, api, audio)

            // 更新 idIndex
            dispatch(updateIdIndex(nextIdIndex))
        }
    }

    if (id) {
        play(id, api, audio)
    }

    return <audio ref={audio} autoPlay></audio>
}

