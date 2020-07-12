import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import platform from '../api/config/platform'
import { updateAutoIndex, updateAudioStatus, userControlAudio, updateCurrentTime, updateSong } from "../store/actions";

function play(id, api, audio) {
    const source = platform[api](id)
    console.log(id, source)
    audio.current.src = source
    audio.current.play()
}

export default function Audio() {
    const { id, api } = useSelector(state => state.updateSong.song)
    const { songList } = useSelector(state => state.updateSongList.songList)
    const idIndex = useSelector(state => state.updateIdIndex.idIndex)
    const { autoIndex } = useSelector(state => state.updateAutoIndex.autoIndex)
    const audioStatus  = useSelector(state => state.updateAudioStatus.audioStatus)
    const { userControl } = useSelector(state => state.userControlAudio.userControl)
    const dispatch = useDispatch()
    const audio = useRef(null)
    const volume = useSelector(state => state.updateVolume.volume) // 音量
    const mode = useSelector(state => state.updateMode.mode) // 播放模式

    useEffect(() => {
        if (id) {
            play(id, api, audio)
        }
    }, [id, api])

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
                getNextSong(autoIndex, songList, mode)
            }

            audio.current.ontimeupdate = () => {
                const currentTime = audio.current.currentTime
                const data = { currentTime }
                // 更新当前歌曲进度
                dispatch(updateCurrentTime(data))
            }

            audio.current.onerror = () => {
                if (audio.current.networkState === 3) { // 3 = NETWORK_NO_SOURCE - 未找到音频/视频来源
                    console.log('没有音乐资源')
                    // 要进行判断有没有歌单 -> 播放下一首歌
                    if (songList.length > 1) {
                        getNextSong(autoIndex, songList, mode)
                    } else {
                        // 弹窗
                    }
                }

                // console.log(audio.current.networkState) // 网络状态
                // console.log(audio.current.error.code)   // 错误信息

            }
        }
    }, [autoIndex])

    // 控制音量 footer -> audio
    useEffect(() => {
        if (audio) {
            audio.current.volume = volume
        }
    }, [volume])

    // 单曲循环 footer -> audio
    useEffect(() => {
        if (audio && mode === 'singlecycle') {
            audio.current.loop = 'loop'
        }
    }, [mode])

    // 手势控制 播放/暂停
    useEffect(() => {
        if (audioStatus === 'play' && userControl) {
            audio.current.play()
            dispatch(userControlAudio({ userControl: false }))
        } else if (audioStatus === 'pause' && userControl) {
            audio.current.pause()
            dispatch(userControlAudio({ userControl: false }))
        }
    }, [audioStatus])

    // 获取下一首 + 播放模式（列表循环、随机播放）
    function getNextSong(autoIndex, songList, mode) {
        if (songList && autoIndex && mode) {
            let nextIndex
            if (mode === 'songListLoop') {
                // 列表循环
                nextIndex = autoIndex + 1
                // 重新播放
                if (nextIndex === songList.length) {
                    // autoIndex = -1
                    nextIndex = 0
                }
            } else if (mode === 'random') {
                // 随机播放
                const songListLength = songList.length
                const randomIndex = Math.floor(Math.random() * songListLength)
                if (randomIndex !== autoIndex) {
                    nextIndex = randomIndex
                }
            }

            // 更新 song
            dispatch(updateSong(songList[nextIndex]))

            // 更新 autoIndex
            dispatch(updateAutoIndex({ autoIndex: nextIndex }))
        }
    }

    return <audio ref={audio} autoPlay></audio>
}

/**
 *  audio 的逻辑
 *
 *  初始 -> 数据流向（数据皆存储于 redux）
 *    1、{ id, api } 的更新 -> 播放音乐
 *    2、idIndex 的更新 -> 分发更新 autoIndex -> 更新 audio 事件函数
 *
 *  例子
 *    点击歌单中的歌曲，播放音乐 -> 更新 { id, api } 、idIndex
 *    播放模式(列表、单曲、随机)、自动播放下一曲 -> idIndex -> autoIndex -> audio 事件函数
 *
 */


