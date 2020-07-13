import {
    UPDATE_LOGIN_STATUS
} from './actions'

const otherReducers = {
    updateLoginStatus(state = { hasLogin: false }, action) {
        switch (action.type) {
            case UPDATE_LOGIN_STATUS:
                return {
                    state,
                    hasLogin: action.playload.hasLogin
                }
            default:
                return state
        }
    }
}

export default otherReducers