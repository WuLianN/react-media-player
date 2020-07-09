import React, { useEffect, useRef, useState } from "react";
import "./Footer.css"
import { useSelector, useDispatch } from 'react-redux'
import { userControlAudio, updateAudioStatus, updateIdIndex, updateSong } from "../../store/actions";
import { formatSec } from '../../utils/transform'
import { Slider } from 'antd';

import Audio from '../Audio'


export default function Footer() {
    const prev = require('../../assets/player/prev.png')
    const next = require('../../assets/player/next.png')
    const pause = require('../../assets/player/pause.png')
    const play = require('../../assets/player/play.png')
    const laba = require('../../assets/player/laba.png')
    const mute = require('../../assets/player/mute.png')
    const songListLoop = require('../../assets/player/songListLoop.png')
    const singlecycle = require('../../assets/player/singlecycle.png')
    const random = require('../../assets/player/random.png')
    const dispatch = useDispatch()
    const { audioStatus } = useSelector(state => state.updateAudioStatus.audioStatus)
    const { songList } = useSelector(state => state.updateSongList.songList)
    const { autoIndex } = useSelector(state => state.updateAutoIndex.autoIndex)
    const { duration } = useSelector(state => state.updateSong.song)
    const { currentTime } = useSelector(state => state.updateCurrentTime.currentTime)
    const imgStatus = useRef(null)
    const [isMuted, setIsMuted] = useState(false)
    const [volume, setVolume] = useState(1)
    const [loop, setLoop] = useState(false)
    const [reserveLastVolume, setReserveLastVolue] = useState(null)
    const [mode, setMode] = useState('songListLoop')


    useEffect(() => {
        if (audioStatus === 'play') {
            imgStatus.current.src = pause
        } else if (audioStatus === 'pause') {
            imgStatus.current.src = play
        }
    }, [audioStatus])

    function statusControls() {
        // 检查音乐播放状态
        if (audioStatus === 'play') {
            // 请求 暂停 音乐
            dispatch(updateAudioStatus({ audioStatus: 'pause' }))
            dispatch(userControlAudio({ userControl: true }))
        } else if (audioStatus === 'pause') {
            // 请求 播放 音乐
            dispatch(updateAudioStatus({ audioStatus: 'play' }))
            dispatch(userControlAudio({ userControl: true }))
        }
    }

    function prevSong() {
        const prevIndex = autoIndex - 1
        if (prevIndex !== -1) {
            const { id, api } = songList[prevIndex]
            const data = { id, api }
            const idIndexData = { idIndex: prevIndex }
            dispatch(updateSong(data))
            dispatch(updateIdIndex(idIndexData))
        }
    }

    function nextSong() {
        const nextIndex = autoIndex + 1
        if (nextIndex !== songList.length) {
            const { id, api } = songList[nextIndex]
            const data = { id, api }
            const idIndexData = { idIndex: nextIndex }
            dispatch(updateSong(data))
            dispatch(updateIdIndex(idIndexData))
        }
    }

    function controlMute() {
        if (isMuted) {
            setIsMuted(false)
            // 还原上个volume
            setVolume(reserveLastVolume)
        } else {
            setIsMuted(true)
            // 备份volume 
            setReserveLastVolue(volume)
            setVolume(0)
        }
    }

    function Volume() {
        if (isMuted) {
            return <img onClick={controlMute} className="footer-volume-img" src={mute} alt="喇叭" />
        } else {
            return <img onClick={controlMute} className="footer-volume-img" src={laba} alt="静音" />
        }
    }

    function changeVolume(value) {
        setVolume(value / 100)
    }

    function playMode(mode, e) {
        e.preventDefault();
        const modeType = ['songListLoop', 'singlecycle', 'random']
        const currentModeIndex = modeType.indexOf(mode)
        let nextModeIndex = currentModeIndex + 1
        if (nextModeIndex === modeType.length) {
            nextModeIndex = 0
        }

        const nextMode = modeType[nextModeIndex]
        if(nextMode === 'songListLoop'){
            // 取消随机播放
        }else if(nextMode === 'singlecycle'){
            // 设置 loop
            setLoop(true)
        } else if(nextMode === 'random'){
            // 取消 loop
            setLoop(false)
        }

        setMode(nextMode)
    }

    function Mode(props) {
        const mode = props.mode
        // 列表循环 单曲循环 随机播放

        if (mode === 'songListLoop') {
            return <img onClick={e => playMode(mode, e)} className="footer-mode-img" src={songListLoop} alt={mode} title="列表循环" />
        } else if (mode === 'singlecycle') {
            return <img onClick={e => playMode(mode, e)} className="footer-mode-img" src={singlecycle} alt={mode} title="单曲循环" />
        } else if (mode === 'random') {
            return <img onClick={e => playMode(mode, e)} className="footer-mode-img" src={random} alt={mode} title="随机播放" />
        }
    }

    return (
        <div className="footer">
            <div className="footer-controls">
                <div className="footer-controls-icon footer-size-small"><img className="footer-controls-img1" onClick={prevSong} src={prev} alt="prev" /></div>
                <div className="footer-controls-icon footer-size-middle"><img className="footer-controls-img2" onClick={statusControls} ref={imgStatus} src={play} alt="status" /></div>
                <div className="footer-controls-icon footer-size-small"><img className="footer-controls-img1" onClick={nextSong} src={next} alt="next" /></div>
            </div>

            <div className="footer-duration">
                <span>{currentTime ? formatSec(currentTime) : '00:00'}</span>
                <Slider className="footer-duration-slider"
                    tipFormatter={formatSec} min={0} max={duration / 1000} value={currentTime}
                />
                <span>{duration ? formatSec(duration / 1000) : '00:00'}</span>
            </div>

            <div className="footer-volume">
                <Volume />
                <Slider className="footer-volume-slider"
                    min={0} max={100} defaultValue={100}
                    onAfterChange={changeVolume}
                />
            </div>

            <div className="footer-other-controls">
                <Mode mode={mode} />
            </div>

            <Audio volume={volume} loop={loop}  mode={mode} />
        </div>
    )
}

// 注：不能操控currentTime