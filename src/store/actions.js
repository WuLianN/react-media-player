/*
 * action types
 */

// 音频
export const UPDATE_SONG = 'UPDATE_SONG' // 更新歌曲
export const UPDATE_SONGLIST = 'UPDATE_SONGLIST' // 更新歌单
export const UPDATE_ID_INDEX = 'UPDATE_ID_INDEX' // 更新 id 在歌单中的索引
export const UPDATE_AUTO_INDEX = 'UPDATE_AUTO_INDEX' // 更新自动递增的索引（下一首歌曲的索引）
export const UPDATE_AUDIO_STATUS = { // 自动控制 音乐播放器状态（播放/暂停）图标 audio -> footer
    PLAY: 'PLAY',
    PAUSE: 'PAUSE'
}
export const USER_CONTROL_AUDIO = { // 手动控制 音乐播放器状态 （播放/暂停）footer -> audio
    USER: true,
    DEFAULT: false
}

export const UPDATE_CURRENT_TIME = 'UPDATE_CURRENT_TIME' // 更新歌曲当前进度
export const UPDATE_VOLUME = 'UPDATE_VOLUME'// 更新音量
export const UPDATE_MODE = { // 更新模式
    SONGLIST_LOOP: 'songListLoop',
    SINGLE_CYCLE: 'singlecycle',
    RANDOM: 'random'
}

/*
 * action creators   
 */

export function updateSong(playload) {
    return { type: UPDATE_SONG, playload }
}

export function updateSongList(playload) {
    return { type: UPDATE_SONGLIST, playload }
}

export function updateIdIndex(playload) {
    return { type: UPDATE_ID_INDEX, playload }
}

export function updateAutoIndex(playload) {
    return { type: UPDATE_AUTO_INDEX, playload }
}

export function updateAudioStatus(playload) {
    if (playload.audioStatus === 'play') {
        return { type: UPDATE_AUDIO_STATUS.PLAY, playload }
    } else if (playload.audioStatus === 'pause') {
        return { type: UPDATE_AUDIO_STATUS.PAUSE, playload }
    }
}

export function userControlAudio(playload) {
    if (playload.userControlAudio) {
        return { type: USER_CONTROL_AUDIO.USER, playload }
    } else {
        return { type: USER_CONTROL_AUDIO.DEFAULT, playload }
    }
}

export function updateCurrentTime(playload) {
    return { type: UPDATE_CURRENT_TIME, playload }
}

export function updateVolume(playload) {
    return { type: UPDATE_VOLUME, playload }
}

export function updateMode(playload) {
    if (playload.mode === 'songListLoop') {
        return { type: UPDATE_MODE.SONGLIST_LOOP, playload }
    } else if (playload.mode === 'singlecycle') {
        return { type: UPDATE_MODE.SINGLE_CYCLE, playload }
    } else if (playload.mode === 'random') {
        return { type: UPDATE_MODE.RANDOM, playload }
    }
}

// 基本
export const UPDATE_LOGIN_STATUS = {
    WY: 'UPDATE_LOGIN_STATUS_WY',
    QQ: 'UPDATE_LOGIN_STATUS_QQ'
}

export const UPDATE_SIDERBAR = 'UPDATE_SIDERBAR' // 获取 '全部' 用户歌单后 -> 更新SiderBar

export function updateLoginStatus(playload) {
    if (playload.platform === 'WY') {
        return { type: UPDATE_LOGIN_STATUS.WY, playload }
    } else if (playload.platform === 'QQ') {
        return { type: UPDATE_LOGIN_STATUS.QQ, playload }
    }
}

export function updateSiderBar(playload) {
    return { type: UPDATE_SIDERBAR, playload }
}