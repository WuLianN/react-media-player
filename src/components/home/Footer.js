import React, { useEffect, useRef, useState } from "react";
import "./Footer.css"
import { useSelector, useDispatch } from 'react-redux'
import { userControlAudio, updateAudioStatus, updateIdIndex, updateSong } from "../../store/actions";
import { formatSec, mapArtist } from '../../utils/transform'
import { Slider } from 'antd';

import Audio from '../Audio'


export default function Footer() {
    const laba = require('../../assets/player/laba.png')
    const mute = require('../../assets/player/mute.png')
    const songListLoop = require('../../assets/player/songListLoop.png')
    const singlecycle = require('../../assets/player/singlecycle.png')
    const random = require('../../assets/player/random.png')
    const songListLogo = require('../../assets/player/songList.png')
    const dispatch = useDispatch()
    const { songList } = useSelector(state => state.updateSongList.songList)
    const { id } = useSelector(state => state.updateSong.song)
    const [volume, setVolume] = useState(1)
    const [loop, setLoop] = useState(false)
    const [reserveLastVolume, setReserveLastVolue] = useState(null)
    const [mode, setMode] = useState('songListLoop')
    const [showSongList, setShowSongList] = useState(false)

    // 音量
    function changeVolume(value) {
        setVolume(value / 100)
    }

    // 播放模式
    function playMode(mode, e) {
        e.preventDefault();
        const modeType = ['songListLoop', 'singlecycle', 'random']
        const currentModeIndex = modeType.indexOf(mode)
        let nextModeIndex = currentModeIndex + 1
        if (nextModeIndex === modeType.length) {
            nextModeIndex = 0
        }

        const nextMode = modeType[nextModeIndex]
        if (nextMode === 'songListLoop') {
            // 取消随机播放
        } else if (nextMode === 'singlecycle') {
            // 设置 loop
            setLoop(true)
        } else if (nextMode === 'random') {
            // 取消 loop
            setLoop(false)
        }

        setMode(nextMode)
    }

    function isShowSongList() {
        if (showSongList) {
            setShowSongList(false)
        } else {
            setShowSongList(true)
        }
    }

    function Volume() {
        const [isMuted, setIsMuted] = useState(false)

        // 静音
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

        if (isMuted) {
            return <img onClick={controlMute} className="footer-volume-img" src={mute} alt="静音" />
        } else {
            return <img onClick={controlMute}  className="footer-volume-img" src={laba} alt="喇叭" />
        }
    }

    function Mode(props) {
        const mode = props.mode
        // 列表循环 单曲循环 随机播放

        if (mode === 'songListLoop') {
            return <div className="footer-mode" onClick={e => playMode(mode, e)}>
                <img className="footer-mode-img" src={songListLoop} alt={mode} title="列表循环" />
            </div>
        } else if (mode === 'singlecycle') {
            return <div className="footer-mode" onClick={e => playMode(mode, e)}>
                <img className="footer-mode-img" src={singlecycle} alt={mode} title="单曲循环" />
            </div>
        } else if (mode === 'random') {
            return <div className="footer-mode" onClick={e => playMode(mode, e)}>
                <img className="footer-mode-img" src={random} alt={mode} title="随机播放" />
            </div>
        }
    }

    function SongList() {
        const { autoIndex } = useSelector(state => state.updateAutoIndex.autoIndex)
        if (songList) {
            return (<div>
                <div>播放记录</div>
                <div>共{songList.length}首</div>

                {songList.map((item, index) => <div key={index} className="footer-songList-song" style={index === autoIndex && id === item.id ? { color: 'red' } : { color: '' }}>
                    <span className="footer-songList-songName">{item.songName}</span>
                    <span className="footer-songList-artist">{mapArtist(item.artist)}</span>
                    <span></span>
                    <span className="footer-songList-duration">{formatSec(item.duration / 1000)}</span>
                </div>)}

            </div>)
        }
        return null
    }


    function PlayerControls() {
        const prev = require('../../assets/player/prev.png')
        const next = require('../../assets/player/next.png')
        const pause = require('../../assets/player/pause.png')
        const play = require('../../assets/player/play.png')
        const { audioStatus } = useSelector(state => state.updateAudioStatus.audioStatus)
        const { autoIndex } = useSelector(state => state.updateAutoIndex.autoIndex)
        const imgStatus = useRef(null)

        useEffect(() => {
            if (audioStatus === 'play') {
                imgStatus.current.src = pause
            } else if (audioStatus === 'pause') {
                imgStatus.current.src = play
            }
        }, [audioStatus, play, pause])

        // 控制播放状态 播放/暂停
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

        // 上一首
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

        // 下一首
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
        return <div className="footer-controls">
            <div className="footer-controls-icon footer-size-small"><img className="footer-controls-img1" onClick={prevSong} src={prev} alt="prev" /></div>
            <div className="footer-controls-icon footer-size-middle"><img className="footer-controls-img2" onClick={statusControls} ref={imgStatus} src={play} alt="status" /></div>
            <div className="footer-controls-icon footer-size-small"><img className="footer-controls-img1" onClick={nextSong} src={next} alt="next" /></div>
        </div>
    }

    function PlayerDuration() {
        const { duration } = useSelector(state => state.updateSong.song)
        const { currentTime } = useSelector(state => state.updateCurrentTime.currentTime)

        return <div className="footer-duration">
            <span>{currentTime ? formatSec(currentTime) : '00:00'}</span>
            <Slider className="footer-duration-slider"
                tipFormatter={formatSec} min={0} max={duration / 1000} value={currentTime}
            />
            <span>{duration ? formatSec(duration / 1000) : '00:00'}</span>
        </div>
    }

    return (
        <div className="footer">
            <PlayerControls />
            <PlayerDuration />

            <div className="footer-volume">
                <Volume />
                <Slider className="footer-volume-slider"
                    min={0} max={100} defaultValue={100}
                    onAfterChange={changeVolume}
                />
            </div>

            <div className="footer-other-controls">
                <Mode mode={mode} />
                <div onClick={isShowSongList} className="footer-songList-logo" >
                    <img className="footer-songList-logo-img" src={songListLogo} alt="歌单" style={songList ? { display: 'block' } : { display: 'none' }} />
                </div>
            </div>

            <div className="footer-songList" style={showSongList ? { display: 'block' } : { display: 'none' }}>
                <SongList />
            </div>

            <Audio volume={volume} loop={loop} mode={mode} />
        </div>
    )
}

// 注：进度条不能操控 currentTime
// 因为：antd Slider 组件做进度条，没那么好使。
// 所以：有时间，在写个进度条