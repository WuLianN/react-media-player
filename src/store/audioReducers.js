/**
 * 以下的函数都是关于音频的控制
 */

import {
    UPDATE_SONG,
    UPDATE_SONGLIST,
    UPDATE_ID_INDEX,
    UPDATE_AUTO_INDEX,
    UPDATE_AUDIO_STATUS,
    USER_CONTROL_AUDIO,
    UPDATE_CURRENT_TIME,
    UPDATE_SLIDER_TIME,
    UPDATE_VOLUME,
    UPDATE_MODE
} from './actions'


const audioReducer = {
    // 更新歌曲
    updateSong(state = { song: {} }, action) {
        switch (action.type) {
            case UPDATE_SONG:
                return {
                    ...state.song,
                    song: action.playload
                }
            default:
                return state
        }
    },

    // 更新歌单
    updateSongList(state = { songList: {} }, action) {
        switch (action.type) {
            case UPDATE_SONGLIST:
                return {
                    ...state.songList,
                    songList: action.playload
                }
            default:
                return state
        }
    },

    // 更新id在歌单中的索引
    updateIdIndex(state = { idIndex: '' }, action) {
        switch (action.type) {
            case UPDATE_ID_INDEX:
                return {
                    state,
                    idIndex: action.playload.idIndex
                }
            default:
                return state
        }
    },

    // 更新自动递增的索引
    updateAutoIndex(state = { autoIndex: '' }, action) {
        switch (action.type) {
            case UPDATE_AUTO_INDEX:
                return {
                    state,
                    autoIndex: action.playload.autoIndex
                }
            default:
                return state
        }
    },

    // 更新音乐播放器状态 (footer 图标)
    updateAudioStatus(state = { audioStatus: 'pause' }, action) {
        switch (action.type) {
            case UPDATE_AUDIO_STATUS.PLAY:
                return {
                    state,
                    audioStatus: action.playload.audioStatus
                }
            case UPDATE_AUDIO_STATUS.PAUSE:
                return {
                    state,
                    audioStatus: action.playload.audioStatus
                }
            default:
                return state
        }
    },

    // 更新音乐播放器状态 (audio 播放/暂停)
    userControlAudio(state = { userControl: false }, action) {
        switch (action.type) {
            case USER_CONTROL_AUDIO.USER:
                return {
                    state,
                    userControl: action.playload.userControl
                }
            case USER_CONTROL_AUDIO.DEFAULT:
                return {
                    state,
                    userControl: action.playload.userControl
                }
            default:
                return state
        }
    },

    // 更新歌曲当前进度
    updateCurrentTime(state = { currentTime: '' }, action) {
        switch (action.type) {
            case UPDATE_CURRENT_TIME:
                return {
                    state,
                    currentTime: action.playload
                }
            default:
                return state
        }
    },

    // 更新slider time
    updateSliderTime(state = { sliderTime: 0 }, action) {
        switch (action.type) {
            case UPDATE_SLIDER_TIME:
                return {
                    state,
                    sliderTime: action.playload.sliderTime
                }
            default:
                return state
        }
    },

    // 更新音量
    updateVolume(state = { volume: 1 }, action) {
        switch (action.type) {
            case UPDATE_VOLUME:
                return {
                    state,
                    volume: action.playload.volume
                }
            default:
                return state
        }
    },

    // 更新播放模式
    updateMode(state = { mode: 'songListLoop' }, action) {
        switch (action.type) {
            case UPDATE_MODE.SONGLIST_LOOP:
                return {
                    state,
                    mode: action.playload.mode
                }
            case UPDATE_MODE.SINGLE_CYCLE:
                return {
                    state,
                    mode: action.playload.mode
                }
            case UPDATE_MODE.RANDOM:
                return {
                    state,
                    mode: action.playload.mode
                }

            default:
                return state
        }
    }
}

export default audioReducer 