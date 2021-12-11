import { AUTH_USER, LOGOUT_USER } from "../types"

const initialState = {
    isAuth: false    
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_USER:
            return {...state, isAuth: true}
        case LOGOUT_USER:
            return {...state, isAuth: false}
        default:
            return state
    }
}

export default authReducer