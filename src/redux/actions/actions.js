import {AUTH_USER, LOGOUT_USER} from '../types'

// SESSION

export const authUser = userData => ({type: AUTH_USER, payload: userData})
export const logoutUser = () => ({type: LOGOUT_USER})

