import { login } from "../actions";
import { REQUEST_LOGIN, RECEIVE_LOGIN, FAIL_LOGIN } from "../constants";

const initialState = {
    token: null,
    connected: false,
    fetching: false
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_LOGIN:
        case RECEIVE_LOGIN:
        case FAIL_LOGIN:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};

export default user;
