import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    facility: null
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                facility: action.facility
            }
        case actionTypes.USER_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                facility: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                facility: null
            }
        default:
            return state;
    }
}

export default appReducer;