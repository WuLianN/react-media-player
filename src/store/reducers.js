import { combineReducers } from 'redux'
import {
    UPDATE_SONG, UPDATE_SONGLIST, UPDATE_ID_INDEX, UPDATE_AUTO_INDEX, UPDATE_AUDIO_STATUS, USER_CONTROL_AUDIO, UPDATE_CURRENT_TIME
} from './actions'

// 更新歌曲
function updateSong(state = { song: {} }, action) {
    switch (action.type) {
        case UPDATE_SONG:
            return {
                ...state.song,
                song: action.playload
            }
        default:
            return state
    }
}

// 更新歌单
function updateSongList(state = { songList: {} }, action) {
    switch (action.type) {
        case UPDATE_SONGLIST:
            return {
                ...state.songList,
                songList: action.playload
            }
        default:
            return state
    }
}

// 更新id在歌单中的索引
function updateIdIndex(state = { idIndex: 0 }, action) {
    switch (action.type) {
        case UPDATE_ID_INDEX:
            return {
                state,
                idIndex: action.playload
            }
        default:
            return state
    }
}

// 更新自动递增的索引
function updateAutoIndex(state = { autoIndex: {} }, action) {
    switch (action.type) {
        case UPDATE_AUTO_INDEX:
            return {
                ...state,
                autoIndex: action.playload
            }
        default:
            return state
    }
}

// 更新音乐播放器状态 (footer 图标)
function updateAudioStatus(state = { audioStatus: 'pause' }, action) {
    switch (action.type) {
        case UPDATE_AUDIO_STATUS.PLAY:
            return {
                state,
                audioStatus: action.playload
            }
        case UPDATE_AUDIO_STATUS.PAUSE:
            return {
                state,
                audioStatus: action.playload
            }
        default:
            return state
    }
}

// 更新音乐播放器状态 (audio 播放/暂停)
function userControlAudio(state = { userControl: '' }, action) {
    switch (action.type) {
        case USER_CONTROL_AUDIO.USER:
            console.log(action.playload)
            return {
                state,
                userControl: action.playload
            }
        case USER_CONTROL_AUDIO.DEFAULT:
            return {
                state,
                userControl: action.playload
            }
        default:
            return state
    }
}

// 更新歌曲当前进度
function updateCurrentTime(state = { currentTime: '' }, action) {
    switch (action.type) {
        case UPDATE_CURRENT_TIME:
            return {
                state,
                currentTime: action.playload
            }
        default:
            return state
    }
}



const reducers = combineReducers({
    updateSong,
    updateSongList,
    updateIdIndex,
    updateAutoIndex,
    updateAudioStatus,
    userControlAudio,
    updateCurrentTime
})

export default reducers