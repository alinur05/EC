import { AUTH_USER, LOGOUT_USER } from "../types"

const initialState = {
    isAuth: false,
    userData: {}
}

const sessionReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_USER:
            return {...state, isAuth: true, userData: action.payload}
        case LOGOUT_USER:
            return {...state, isAuth: false, userData: {}}
        default:
            return state
    }
}

export default sessionReducer