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

export const fetchNotes = () =>
    function(dispatch, getState) {
        dispatch(requestNotes())

        return fetch('/api/getAllTitles')
            .then(response => response.json())
            .then(notes => dispatch(receiveNotes(notes)))
            .catch(error => dispatch(failFetchNotes(error)))
    }
