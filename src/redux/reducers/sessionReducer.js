import { CLEAN_UP_PROFILE, SET_SESSION_ERR, TOGGLE_SESSION_LOADING, GET_PROFILE, PURCHASE_COURSE, EDIT_PROFILE, AUTH_USER, CLEAR_AUTH_ERRORS, LOGOUT_USER, SET_AUTH_ERROR, CREATE_NEW_COURSE, REMOVE_COURSE } from "../types"

const initialState = {
    isAuth: null,
    userData: {},
    error: {signin: '', signup: ''},
    loading: false,
    sessionErr: ''
}

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_SESSION_ERR:
            return {...state, sessionErr: action.payload}
        case AUTH_USER:
            return {...state, isAuth: true, userData: action.payload}
        case LOGOUT_USER:
            return {...state, isAuth: false, userData: {}}
        case GET_PROFILE:
            return {...state, userData: action.payload}
        case SET_AUTH_ERROR:
            const {authKey, value} = action.payload
            return {...state, error: {...state.error, [authKey]: value}}
        case CLEAR_AUTH_ERRORS:
            return {...state, error: {signin: '', signup: ''}}
        case EDIT_PROFILE:
            return {...state, userData: {...state.userData, userModelToSend: action.payload}}
        case PURCHASE_COURSE:
            return {...state, }
        case REMOVE_COURSE:
            return {...state, userData: {...state.userData, userCreateCourseModels: [...state.userData.userCreateCourseModels].filter(item => item.courseModel.id !== action.payload)}}
        case TOGGLE_SESSION_LOADING:
            return {...state, loading: !state.loading}
        default:
            return state
    }
}

export default sessionReducer