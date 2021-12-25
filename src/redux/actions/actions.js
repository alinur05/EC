import PostService from '../../API/API'
import { getCategoriesCapitaled, getLocalStorage, removeLocalStorage, setLocalStorage } from '../../utiles'
import { UNLIKE_COURSE, LIKE_COURSE, CLEAN_UP_BOUGHT_COURSE, CLEAN_UP_PROFILE, SET_BOUGHT_ERROR, UPDATE_COURSE, SET_MY_COURSE_LESSON, REMOVE_LESSON, REMOVE_COURSE, CREATE_LESSONS, ADD_LESSON, GET_PROFILE, PURCHASE_COURSE, STEP_RESET, SET_CREATE_ERROR, SET_COURSE_IMAGE, CREATE_NEW_COURSE, GET_COURSES_BY_QUERY, CLEAN_UP_SEARCHED_COURSES, CLEAN_UP_CATEGORY_COURSES, GET_COURSE_BY_CATEGORY, COMMENT_COURSE, EDIT_PROFILE, SPLIT_BY_CATEGIRES, GET_ALL_COURSES, AUTH_USER, LOGOUT_USER, SET_AUTH_ERROR, CLEAR_AUTH_ERRORS, CLEAN_UP_COURSES, CLEAN_UP_ALL_COURSES, GET_CATEGORIES, GET_COURSE_DETAILS, CLEAN_UP_DETAILS, NEXT_STEP, TOGGLE_CREATE_LOADING, TOGGLE_SEARCH_LOADING, SET_SEARCH_ERROR, TOGGLE_SESSION_LOADING, CLEAN_UP_MY_COURSE, SET_MY_COURSE_DATA, SET_MY_COURSE_ERROR, TOGGLE_MY_COURSE_LOADING, SAVE_LESSON, SAVE_COURSE, TOGGLE_PURCHASE_LOADING, SET_PURCHASE_ERROR, SET_SESSION_ERR, TOGGLE_BOUGHT_LOADING, SET_BOUGHT_COURSE, SET_LESSON} from '../types'

// SESSION

export const likeCourse = (courseId) => async dispatch => {
    const responce = await PostService.likeCourse(courseId)
    dispatch({type: LIKE_COURSE, payload: responce.value})
}
export const unlikeCourse = (courseId) => async dispatch => {
    const responce = await PostService.unLikeCourse(courseId)
    console.log(responce)
    dispatch({type: UNLIKE_COURSE, payload: responce.value})
}

export const updateUserAva = file => async dispatch => {
    PostService.updateAva(file)
    dispatch(getProfile())   
}

export const setAuthError = (authKey, value) => ({type: SET_AUTH_ERROR, payload: {authKey, value}})

export const toggleSessionLoading = () => ({type: TOGGLE_SESSION_LOADING})
export const clearAuthErrors = () => ({type: CLEAR_AUTH_ERRORS})

export const getProfile = () => async dispatch => {
    dispatch(toggleSessionLoading())
        const responce = await PostService.getProfile()
        if(responce.status !== "FAIL") {
            const session = getLocalStorage("session")
            let result = {
                ...responce.value,
                token: session.token
            }
            removeLocalStorage("session")
            setLocalStorage("session", result)
            dispatch({type: GET_PROFILE, payload: result})
        }else {
            dispatch({type: SET_SESSION_ERR, payload: responce.details})
        }   
    dispatch(toggleSessionLoading())
}

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
        const capitalledCategories = getCategoriesCapitaled(categories)

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

export const togglePurchaseLoading = () => ({type: TOGGLE_PURCHASE_LOADING})
export const setPurchaseError = error => ({type: SET_PURCHASE_ERROR, payload: error})

export const purchaseCourse = (courseId) => async dispatch => {
    dispatch(togglePurchaseLoading())
    const responce = await PostService.purchaseCourse(courseId)

    if(responce.status !== "FAIL") {
        console.log("purchased!")
        dispatch({type: PURCHASE_COURSE, payload: responce.value})
        dispatch(getProfile())
    }else {
        dispatch(setPurchaseError(responce.details))
    }
    dispatch(togglePurchaseLoading())
}

// MY COURSE 

export const cleanUpMyCourse = () => ({type: CLEAN_UP_MY_COURSE})
export const setMyCourseError = payload => ({type: SET_MY_COURSE_ERROR, payload})
export const toggleMyCourseLoading = () => ({type: TOGGLE_MY_COURSE_LOADING})

export const getMyCourseData = id => async dispatch => {
    dispatch(toggleMyCourseLoading())
        const responce = await PostService.getCourseDetails(id)
        dispatch({type: SET_MY_COURSE_DATA, payload: responce}) 
    dispatch(toggleMyCourseLoading())
}

export const addMyCourseLesson = lesson => async dispatch => {
        const responce = await PostService.createLesson(lesson)

        if(responce.status !== "FAIL") {
            dispatch({type: SET_MY_COURSE_LESSON, payload: responce.value})
        }else {
            dispatch(setMyCourseError(responce.details))
        }
}

export const saveLesson = lesson => async dispatch => {
    const responce = await PostService.saveLesson(lesson)

    if(responce.status !== "FAIL") {
        dispatch({type: SAVE_LESSON, payload: responce.value})
    }
} 

export const removeMyCourseLesson = id => async dispatch => {
    const responce = await PostService.removeLesson(id)
    dispatch({type: REMOVE_LESSON, payload: responce.value})
}

export const updateCourse = body => async dispatch => {
    dispatch(toggleMyCourseLoading())
        const responce = await PostService.updateCourse(body)
        dispatch({type: UPDATE_COURSE, payload: responce})
    dispatch(toggleMyCourseLoading())
}

export const removeMyCourse = id => async dispatch => {
    const responce = await PostService.removeCourse(id)
    console.log(responce)
}

// BOUGHT COURSE

export const toggleBoughtCourse = () => ({type: TOGGLE_BOUGHT_LOADING})
export const setBoughtCourseErr = text => ({type: SET_BOUGHT_ERROR, payload: text})

export const setBoughtData = id => async dispatch => {
    dispatch(toggleBoughtCourse())
        const responce = await PostService.getCourseDetails(id)
        dispatch({type:SET_BOUGHT_COURSE, payload: responce})
    dispatch(toggleBoughtCourse())
}
export const clearBoughtCourseData = () => ({type: CLEAN_UP_BOUGHT_COURSE})
export const setLesson = lesson => ({type: SET_LESSON, payload: lesson})
