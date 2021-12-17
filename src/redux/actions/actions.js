import PostService from '../../API/API'
import { removeLocalStorage, setLocalStorage } from '../../utiles'
import {AUTH_USER, LOGOUT_USER, SET_AUTH_ERROR} from '../types'

// SESSION

export const setAuthError = (authKey, value = "") => ({type: SET_AUTH_ERROR, payload: {authKey, value}})

export const signUpUser = body => async dispatch => {
    console.log("action")
    console.log(body)
    const responce = await PostService.sign_up(body)
    console.log(responce)

    if(!responce.details) {
        console.log(responce.value)
        dispatch({type: AUTH_USER, payload: responce.value})
        dispatch(setAuthError("signup", ""))
    }else {
        dispatch(setAuthError("signup", responce.details))
    }
}

export const authUser = body => async dispatch => {
    const responce = await PostService.sign_in(body)
    setLocalStorage("session", responce.value)
    dispatch({type: AUTH_USER, payload: responce.value})
}

export const logoutUser = () => {
    removeLocalStorage("session")
    return {type: LOGOUT_USER}
}

