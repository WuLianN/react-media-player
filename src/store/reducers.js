/**
 * 在这个文件合并 reducer，并暴露给 store
 */

import { combineReducers } from 'redux'
import audioReducers from './audioReducers'
import otherReducers from './otherReduces'

const reducers = combineReducers({
    ...audioReducers,
    ...otherReducers
})

export default reducers