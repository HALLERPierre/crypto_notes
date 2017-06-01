import { LOG_IN } from '../constants'

export function login(username, password) {
    return {
        type: LOG_IN,
        payload: {
            username: username,
            password: password
        }
    }
}

// requestApi('/api/connect', 'GET', {}, function(res) {
