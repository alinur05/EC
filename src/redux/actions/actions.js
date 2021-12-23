import PostService from '../../API/API'
import { getCategoriesCapitaled, getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utiles'
import { REMOVE_LESSON, REMOVE_COURSE, CREATE_LESSONS, ADD_LESSON, GET_PROFILE, PURCHASE_COURSE, STEP_RESET, SET_CREATE_ERROR, SET_COURSE_IMAGE, CREATE_NEW_COURSE, GET_COURSES_BY_QUERY, CLEAN_UP_SEARCHED_COURSES, CLEAN_UP_CATEGORY_COURSES, GET_COURSE_BY_CATEGORY, COMMENT_COURSE, EDIT_PROFILE, SPLIT_BY_CATEGIRES, GET_ALL_COURSES, AUTH_USER, LOGOUT_USER, SET_AUTH_ERROR, CLEAR_AUTH_ERRORS, CLEAN_UP_COURSES, CLEAN_UP_ALL_COURSES, GET_CATEGORIES, GET_COURSE_DETAILS, CLEAN_UP_DETAILS, NEXT_STEP, TOGGLE_CREATE_LOADING, TOGGLE_SEARCH_LOADING, SET_SEARCH_ERROR, TOGGLE_SESSION_LOADING, CLEAN_UP_MY_COURSE, SET_MY_COURSE_DATA, SET_MY_COURSE_ERROR, TOGGLE_MY_COURSE_LOADING} from '../types'

// SESSION

export const setAuthError = (authKey, value) => ({type: SET_AUTH_ERROR, payload: {authKey, value}})

export const clearAuthErrors = () => ({type: CLEAR_AUTH_ERRORS})

export const signUpUser = body => async dispatch => {
    dispatch(toggleSessionLoading())
    const responce = await PostService.sign_up(body)

    if(responce.status === "FAIL") {
        dispatch(setAuthError("signup", responce.details))
    }else {
        setLocalStorage("session", responce.value)
        dispatch({type: AUTH_USER, payload: responce.value})
        dispatch(clearAuthErrors())
    }
    dispatch(toggleSessionLoading())
}

export const toggleSessionLoading = () => ({type: TOGGLE_SESSION_LOADING})
export const authUser = body => async dispatch => {
    dispatch(toggleSessionLoading())
    const responce = await PostService.sign_in(body)

    if(responce.status === "FAIL") {
        console.log(responce.details)
        dispatch(setAuthError("signin", responce.details))
    }else {
        setLocalStorage("session", responce.value)
        dispatch({type: AUTH_USER, payload: responce.value})
        dispatch(clearAuthErrors())
    }
    dispatch(toggleSessionLoading())
}

export const logoutUser = () => {
    removeLocalStorage("session")
    return {type: LOGOUT_USER}
}


// COURSES

export const getCoures = (token) => async dispatch => {
    dispatch(toggleSearchLoading())
        const responce = await PostService.getAllCourses()
        const {allCourses, categories} = responce
        
        const capitalledCategories = getCategoriesCapitaled(categories.value)

        const splittedByCategories = await PostService.getCoursesByCategoryId(capitalledCategories, token)

        if(allCourses.status === "FAIL" ) {
            throw new Error(allCourses.details)
        }else if(categories.status === "FAIL") {
            throw new Error(categories.details)
        }

        dispatch({type: GET_ALL_COURSES, payload: allCourses.value})
        dispatch({type: GET_CATEGORIES, payload: capitalledCategories})
        dispatch({type: SPLIT_BY_CATEGIRES, payload: splittedByCategories})
    dispatch(toggleSearchLoading())
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
    dispatch(toggleSearchLoading())
        const responce = await PostService.getCourseByCategory(name) 
        dispatch({type: GET_COURSE_BY_CATEGORY, payload: responce.value})
    dispatch(toggleSearchLoading())
}

export const searchQuery = query => async dispatch => {
    dispatch(toggleSearchLoading())
    const responce = await PostService.getCourseByQuery(query)
    if(responce.status === "FAIL") {
        dispatch(setSearchError(responce.details))
    }else {
        dispatch({type: GET_COURSES_BY_QUERY, payload: responce.value})
        dispatch(toggleSearchLoading())
    }
}

export const toggleSearchLoading = () => ({type: TOGGLE_SEARCH_LOADING})
export const setSearchError = () => ({type: SET_SEARCH_ERROR})

// COURSE

export const commentCourse = (body, token) => async dispatch => {
    const responce = await PostService.commentCourse(body, token)
    dispatch({type: COMMENT_COURSE, payload: responce.value})
}
export const setCourseImage = (courseId, file, token) => async dispatch => {
    const responce = await PostService.setCourseImage(courseId, file, token)
    dispatch({type: SET_COURSE_IMAGE, payload: responce.value})
}

export const removeCourse = courseId => async dispatch => {
    const responce = await PostService.removeCourse(courseId)
    console.log(responce)
    dispatch({type: REMOVE_COURSE, payload: responce.value.id})
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
export const addLesson = lesson => ({type: ADD_LESSON, payload: lesson})

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

export const createLessons = lessons => async dispatch => {
    dispatch(toggleCreateCourseLoading())
        const responce = await PostService.createLessons(lessons)
        dispatch(nextStep())
    dispatch(toggleCreateCourseLoading())
}
export const finishCreateCourse = (formData, courseId) => async dispatch => {
    dispatch(toggleCreateCourseLoading())
        const responce = await PostService.setCourseImage(courseId, formData)
        dispatch({type: SET_COURSE_IMAGE, payload: responce.value})
    dispatch(resetSteps())
}

export const removeLesson = id => ({type: REMOVE_LESSON, payload: id})

// PURCHASE

export const purchaseCourse = (courseId, token) => async dispatch => {
    const responce = await PostService.purchaseCourse(courseId, token)

    if(responce.status !== "FAIL") {
        dispatch({type: PURCHASE_COURSE, payload: responce.value})
    }else {
        
    }

}

// MY COURSE

export const cleanUpMyCourse = () => ({type: CLEAN_UP_MY_COURSE})
export const setMyCourseError = payload => ({type: SET_MY_COURSE_ERROR, payload})
export const toggleMyCourseLoading = () => ({type: TOGGLE_MY_COURSE_LOADING})

export const getMyCourseData = id => async dispatch => {
    dispatch(toggleMyCourseLoading())
        const responce = await PostService.getCourseDetails(id)
        if(responce.status !== "FAIL") {
            dispatch({type: SET_MY_COURSE_DATA, payload: responce}) 
        }else {
            dispatch(setMyCourseError(responce.details))
        }
    dispatch(toggleMyCourseLoading())
}