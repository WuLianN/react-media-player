import React, { useEffect, useRef } from "react";
import "./Footer.css"
import { useSelector, useDispatch } from 'react-redux'
import { userControlAudio, updateAudioStatus, updateIdIndex, updateSong } from "../../store/actions";

export default function Footer() {
    const prev = require('../../assets/player/prev.png')
    const next = require('../../assets/player/next.png')
    const pause = require('../../assets/player/pause.png')
    const play = require('../../assets/player/play.png')
    const dispatch = useDispatch()
    const { audioStatus } = useSelector(state => state.updateAudioStatus.audioStatus)
    const { songList } = useSelector(state => state.updateSongList.songList)
    const { autoIndex } = useSelector(state => state.updateAutoIndex.autoIndex)
    const imgStatus = useRef(null)

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

    return (
        <div className="footer">
            <div className="footer-controls">
                <div className="footer-controls-icon footer-size-small"><img className="footer-controls-img1" onClick={prevSong} src={prev} alt="prev" /></div>
                <div className="footer-controls-icon footer-size-middle"><img className="footer-controls-img2" onClick={statusControls} ref={imgStatus} src={play} alt="status" /></div>
                <div className="footer-controls-icon footer-size-small"><img className="footer-controls-img1" onClick={nextSong} src={next} alt="next" /></div>
            </div>

        </div>
    )
}