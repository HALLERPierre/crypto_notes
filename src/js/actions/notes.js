import { REQUEST_NOTES, RECEIVED_NOTES, FAIL_FETCH_NOTES } from '../constants'

const requestNotes = () => {
    return {
        type: REQUEST_NOTES,
        payload: {
            fetching: true,
        }
    }
}

const receiveNotes = (notes) => {
    return {
        type: RECEIVED_NOTES,
        payload: {
            fetching: false,
            notes: notes,
        }
    }
}

const failFetchNotes = (error) => {
    return {
        type: FAIL_FETCH_NOTES,
        payload: {
            fetching: false,
            error: error,
        }
    }
}

export function fetchNotes() {
    return function(dispatch, getState) {
        dispatch(requestLogin())

        return fetch('/api/getAllTitles')
            .then((response) => dispatch(receiveNotes(response.json())))
            .catch(response => response.json())
            .then(error => dispatch(failLogin(error)))
    }
}

// requestApi('/api/connect', 'GET', {}, function(res) {
