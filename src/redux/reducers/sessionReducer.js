import { EDIT_PROFILE, AUTH_USER, CLEAR_AUTH_ERRORS, LOGOUT_USER, SET_AUTH_ERROR } from "../types"

const initialState = {
    isAuth: false,
    userData: {},
    error: {signin: '', signup: ''}
}

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_USER:
            return {...state, isAuth: true, userData: action.payload}
        case LOGOUT_USER:
            return {...state, isAuth: false, userData: {}}
        case SET_AUTH_ERROR:
            const {authKey, value} = action.payload
            console.log(authKey, value)
            return {...state, error: {...state.error, [authKey]: value}}
        case CLEAR_AUTH_ERRORS:
            return {...state, error: {signin: '', signup: ''}}
        case EDIT_PROFILE:
            return {...state, userData: {...state.userData, userModelToSend: action.payload}}
        default:
            return state
    }
}

export default sessionReducer