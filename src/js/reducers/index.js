import { login } from '../actions'
import { LOG_IN } from '../constants'

const initialState = {
    user: null
}

export function noteApp(state = initialState, action) {
    switch (action.type) {
        case LOG_IN:
            return Object.assign({}, state, {
                user: action.payload
            })
            break
        default:
            return state
    }
}
