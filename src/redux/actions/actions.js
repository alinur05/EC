import PostService from '../../API/API'
import { removeLocalStorage, setLocalStorage } from '../../utiles'
import {AUTH_USER, LOGOUT_USER, SET_AUTH_ERROR, CLEAR_AUTH_ERRORS} from '../types'

// SESSION

export const setAuthError = (authKey, value = "") => ({type: SET_AUTH_ERROR, payload: {authKey, value}})

export const clearAuthErrors = () => ({type: CLEAR_AUTH_ERRORS})

export const signUpUser = body => async dispatch => {
    const responce = await PostService.sign_up(body)

    if(responce.status === "FAIL") {
        dispatch(setAuthError("signup", responce.details))
    }else {
        setLocalStorage("session", responce.value)
        dispatch({type: AUTH_USER, payload: responce.value})
        dispatch(clearAuthErrors())
    }

}

export const authUser = body => async dispatch => {
    const responce = await PostService.sign_in(body)

    if(responce.status === "FAIL") {
        dispatch(setAuthError("signin", responce.details))
    }else {
        setLocalStorage("session", responce.value)
        dispatch({type: AUTH_USER, payload: responce.value})
        dispatch(clearAuthErrors())
    }
}

export const logoutUser = () => {
    removeLocalStorage("session")
    return {type: LOGOUT_USER}
}


