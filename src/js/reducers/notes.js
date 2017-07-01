import { fetchNotes } from '../actions'
import { REQUEST_NOTES, RECEIVED_NOTES, FAIL_FETCH_NOTES } from '../constants'

const initialState = {
    notes: [],
	fetching: false,
}


function notes(state = initialState, action) {
    switch (action.type) {
        case REQUEST_NOTES:
        case RECEIVED_NOTES:
        case FAIL_FETCH_NOTES:
            return Object.assign({}, state, action.payload)
        default:
            return state
    }
}

export default notes
