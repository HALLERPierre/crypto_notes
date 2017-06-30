import { REQUEST_LOGIN, RECEIVE_LOGIN, FAIL_LOGIN } from '../constants'

const requestLogin = () => {
    return {
        type: REQUEST_LOGIN,
        payload: {
            fetching: true,
            connected: false,
        }
    }
}

const receiveLogin = () => {
    return {
        type: RECEIVE_LOGIN,
        payload: {
            fetching: false,
            connected: true,
        }
    }
}

const failLogin = () => {
    return {
        type: FAIL_LOGIN,
        payload: {
            fetching: false,
            connected: false,
        }
    }
}

export function login(username, password) {
    return function(dispatch) {
        dispatch(requestLogin())

        return fetch('/api/connect')
            .then(() => dispatch(receiveLogin()))
            .catch(response => response.json())
            .then(error => dispatch(failLogin(error)))
    }
}

// requestApi('/api/connect', 'GET', {}, function(res) {