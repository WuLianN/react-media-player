import {
    UPDATE_LOGIN_STATUS
} from './actions'

const otherReducers = {
    updateLoginStatus(state = { hasLogin_WY: false,  hasLogin_QQ: false}, action) {
        switch (action.type) {
            case UPDATE_LOGIN_STATUS.WY:
                return {
                    state,
                    hasLogin_WY: action.playload.hasLogin_WY
                }
            case UPDATE_LOGIN_STATUS.QQ: {
                return {
                    state,
                    hasLogin_QQ: action.playload.hasLogin_QQ
                }
            }
            default:
                return state
        }
    }
}

export default otherReducers