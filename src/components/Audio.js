import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import platform from '../api/config/platform'
import { updateAutoIndex, updateAudioStatus, userControlAudio } from "../store/actions";

function play(id, api, audio) {
    const source = platform[api](id)
    console.log(id, source)
    audio.current.src = source
    audio.current.play()
}

export default function Audio() {
    const { id, api } = useSelector(state => state.updateSong.song)
    const { songList } = useSelector(state => state.updateSongList.songList)
    const { idIndex } = useSelector(state => state.updateIdIndex.idIndex)
    const { autoIndex } = useSelector(state => state.updateAutoIndex.autoIndex)
    const { audioStatus } = useSelector(state => state.updateAudioStatus.audioStatus)
    const { userControl } = useSelector(state => state.userControlAudio.userControl)

    const dispatch = useDispatch()
    const audio = useRef(null)

    useEffect(() => {
        // 获得当前歌曲的索引 -> 更新autoIndex
        if (idIndex) {
            dispatch(updateAutoIndex({ autoIndex: idIndex }))
        }
    }, [idIndex])

    useEffect(() => {
        if (audio.current) {
            audio.current.onplay = () => {
                // 更新底部播放器的状态 - pause -> play
                dispatch(updateAudioStatus({ audioStatus: 'play' }))
            }

            audio.current.onpause = () => {
                // 更新底部播放器状态 - play -> pause
                dispatch(updateAudioStatus({ audioStatus: 'pause' }))

            }

            audio.current.onended = () => {
                // 更新底部播放器状态 - play -> pause
                dispatch(updateAudioStatus({ audioStatus: 'pause' }))

                // 自动播放下一首
                getNextSong(autoIndex, songList, audio)
            }
        }
    }, [autoIndex])

    useEffect(() => {
        if (id) {
            play(id, api, audio)
        }
    }, [id])

    useEffect(() => {
        if (audioStatus === 'play' && userControl) {
            audio.current.play()
            dispatch(userControlAudio({ userControl: false }))
        } else if (audioStatus === 'pause' && userControl) {
            audio.current.pause()
            dispatch(userControlAudio({ userControl: false }))
        }
    }, [audioStatus])

    function getNextSong(autoIndex, songList, audio) {
        if (songList && autoIndex) {
            let nextIndex = autoIndex + 1
            // 重新播放
            if (nextIndex === songList.length) {
                // autoIndex = -1
                nextIndex = 0
            }

            const nextSongId = songList[nextIndex].id

            play(nextSongId, api, audio)

            // 更新 autoIndex
            dispatch(updateAutoIndex({ autoIndex: nextIndex }))
        }
    }

    return <audio ref={audio} autoPlay></audio>
}

