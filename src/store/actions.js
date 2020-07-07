/*
 * action types
 */

export const UPDATE_SONG = 'UPDATE_SONG' // 更新歌曲
export const UPDATE_SONGLIST = 'UPDATE_SONGLIST' // 更新歌单
export const UPDATE_ID_INDEX = 'UPDATE_ID_INDEX' // 更新 id 在歌单中的索引

/*
 * other constants
 */

/*
 * action creators   
 */

export function updateSong(data) {
    return { type: UPDATE_SONG, data}
}

export function updateSongList(data){
    return { type: UPDATE_SONGLIST, data}
}

export function updateIdIndex (data){
    return { type: UPDATE_ID_INDEX, data}
}