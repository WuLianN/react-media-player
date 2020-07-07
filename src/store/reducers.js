import { combineReducers } from 'redux'
import {
    UPDATE_SONG, UPDATE_SONGLIST, UPDATE_ID_INDEX
} from './actions'

// 更新歌曲
function updateSong(state = { song: {} }, action) {
    switch (action.type) {
        case UPDATE_SONG:
            return {
                ...state.song,
                song: action.data
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
                songList: action.data
            }
        default:
            return state
    }
}

// 更新id在歌单中的索引
function updateIdIndex(state = { idIndex: {} }, action) {
    switch (action.type) {
        case UPDATE_ID_INDEX:
            return {
                ...state.idIndex,
                idIndex: action.data
            }
        default:
            return state
    }
}

const reducers = combineReducers({
    updateSong,
    updateSongList,
    updateIdIndex
})

export default reducers