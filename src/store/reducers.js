/**
 * 在这个文件合并 reducer，并暴露给 store
 */

import { combineReducers } from 'redux'
import audioReducer from './audioReducer'

const reducers = combineReducers({
    ...audioReducer
})

export default reducers