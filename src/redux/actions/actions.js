import PostService from '../../API/API'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utiles'
import { GET_PROFILE, PURCHASE_COURSE, STEP_RESET, SET_CREATE_ERROR, SET_COURSE_IMAGE, CREATE_NEW_COURSE, GET_COURSES_BY_QUERY, CLEAN_UP_SEARCHED_COURSES, CLEAN_UP_CATEGORY_COURSES, GET_COURSE_BY_CATEGORY, COMMENT_COURSE, EDIT_PROFILE, SPLIT_BY_CATEGIRES, GET_ALL_COURSES, AUTH_USER, LOGOUT_USER, SET_AUTH_ERROR, CLEAR_AUTH_ERRORS, CLEAN_UP_COURSES, CLEAN_UP_ALL_COURSES, GET_CATEGORIES, GET_COURSE_DETAILS, CLEAN_UP_DETAILS, NEXT_STEP, TOGGLE_CREATE_LOADING} from '../types'

// SESSION

export const setAuthError = (authKey, value) => ({type: SET_AUTH_ERROR, payload: {authKey, value}})

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
        console.log(responce.details)
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
export const clearCategoryCourses = () => ({type: CLEAN_UP_CATEGORY_COURSES})
export const clearSearchedCourses = () => ({type: CLEAN_UP_SEARCHED_COURSES})
export const clearCourseDetails = () => ({type: CLEAN_UP_DETAILS})

export const getCourseDetails = id => async dispatch => {
    const responce = await PostService.getCourseDetails(id)
    dispatch({type: GET_COURSE_DETAILS, payload: responce})
}

export const getCourseByCategory = name => async dispatch => {
    const responce = await PostService.getCourseByCategory(name) 
    dispatch({type: GET_COURSE_BY_CATEGORY, payload: responce.value})
}

export const searchQuery = query => async dispatch => {
    dispatch(clearSearchedCourses())
    const responce = await PostService.getCourseByQuery(query)
    if(responce.status === "FAIL") {
        throw new Error(responce.details)
    }else {
        dispatch({type: GET_COURSES_BY_QUERY, payload: responce.value})
    }
}

// COURSE

export const commentCourse = (body, token) => async dispatch => {
    const responce = await PostService.commentCourse(body, token)
    dispatch({type: COMMENT_COURSE, payload: responce.value})
}
export const setCourseImage = (courseId, file, token) => async dispatch => {
    const responce = await PostService.setCourseImage(courseId, file, token)
    dispatch({type: SET_COURSE_IMAGE, payload: responce.value})
}

// PROFILE

export const getProfile = () => async dispatch => {
    const session = getLocalStorage("session")
    const userData = await PostService.getProfile(session.userModelToSend.id, session.token)
    console.log(userData)
    // if(responce.status !== "FAIL") {
    //     dispatch({type: GET_PROFILE, payload: responce.value})
    // }
}

export const editProfile = (body) => async dispatch => {
    const responce = await PostService.editProfile(body)
    dispatch({type: EDIT_PROFILE, paylaod: responce.value})
}
export const editAva = (file, token) => async dispatch => {
    const responce = await PostService.editAva(file, token)
    console.log(responce)
    // dispatch({type: EDIT_AVA, payload: responce.value})
}


// CREATE COURSE

export const setCreateErr = err => ({type: SET_CREATE_ERROR, payload:err})
export const nextStep = () => ({type: NEXT_STEP})
export const resetSteps = () => ({type: STEP_RESET})
export const toggleCreateCourseLoading = () => ({type: TOGGLE_CREATE_LOADING})


export const createCourse = (body) => async dispatch => {
    dispatch(toggleCreateCourseLoading())
        const session = getLocalStorage("session")
        const responce = await PostService.createCourse(body, session.token)
                
        if(responce.status !== "FAIL") {
                dispatch({type: CREATE_NEW_COURSE, payload: responce.value})
                dispatch(nextStep())
        }else {
            dispatch(setCreateErr(responce.details))
        }

    dispatch(toggleCreateCourseLoading())
}

export const createLessonCourse = (lessons, courseId, token) => async dispatch => {
    dispatch(toggleCreateCourseLoading())

        let responce = null
        if(Array.isArray(lessons)) {
            responce = await PostService.createLessons(lessons, courseId, token)
        }else {
            responce = await PostService.createLesson(lessons, courseId, token)
        }

        console.log(responce)
    dispatch(toggleCreateCourseLoading())
}
export const finishCreateCourse = () => async dispatch => {

    dispatch(resetSteps())
}

// PURCHASE

export const purchaseCourse = (courseId, token) => async dispatch => {
    const responce = await PostService.purchaseCourse(courseId, token)

    if(responce.status !== "FAIL") {
        dispatch({type: PURCHASE_COURSE, payload: responce.value})
    }else {
        
    }

}