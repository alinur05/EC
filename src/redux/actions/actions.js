import PostService from '../../API/API'
import { removeLocalStorage, setLocalStorage } from '../../utiles'
import { EDIT_PROFILE, SPLIT_BY_CATEGIRES, GET_ALL_COURSES, AUTH_USER, LOGOUT_USER, SET_AUTH_ERROR, CLEAR_AUTH_ERRORS, CLEAN_UP_COURSES, CLEAN_UP_ALL_COURSES, GET_CATEGORIES, GET_COURSE_DETAILS, CLEAN_UP_DETAILS} from '../types'

// SESSION

export const setAuthError = (authKey, value = "") => ({type: SET_AUTH_ERROR, payload: {authKey, value}})

export const clearAuthErrors = () => ({type: CLEAR_AUTH_ERRORS})

export const signUpUser = body => async dispatch => {
    const responce = await PostService.sign_up(body)

    if(responce.status === "FAIL") {
        dispatch(setAuthError("signup", responce.details))
    }else {
        setLocalStorage("session", responce.value)
        setLocalStorage("TOKEN", responce.value.token)
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
        setLocalStorage("TOKEN", responce.value.token)
        dispatch({type: AUTH_USER, payload: responce.value})
        dispatch(clearAuthErrors())
    }
}

export const logoutUser = () => {
    removeLocalStorage("session")
    removeLocalStorage("TOKEN")
    return {type: LOGOUT_USER}
}


// COURSES

export const getCoures = (token) => async dispatch => {
    const responce = await PostService.getAllCourses()
    const {allCourses, categories} = responce
    const splittedByCategories = await PostService.getCoursesByCategoryId(categories.value, token)

    if(allCourses.status === "FAIL" ) {
        throw new Error(allCourses.details)
    }else if(categories.status === "FAIL") {
        throw new Error(categories.details)
    }

    dispatch({type: GET_ALL_COURSES, payload: allCourses.value})
    dispatch({type: GET_CATEGORIES, payload: categories.value})
    dispatch({type: SPLIT_BY_CATEGIRES, payload: splittedByCategories})
}

export const cleanCourses = () => ({type: CLEAN_UP_ALL_COURSES})

export const clearCourseDetails = () => ({type: CLEAN_UP_DETAILS})
export const getCourseDetails = id => async dispatch => {
    const responce = await PostService.getCourseDetails(id)
    dispatch({type: GET_COURSE_DETAILS, payload: responce})
}

// PROFILE

export const editProfile = (body) => async dispatch => {
    const {value} = await PostService.editProfile(body)
    if(value){
        setLocalStorage('session', value)
    }
    dispatch({type: EDIT_PROFILE, paylaod: value})
}