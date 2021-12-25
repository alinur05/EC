
// SESSION

export const AUTH_USER = "AUTH/AUTH_USER"
export const LOGOUT_USER = "AUTH/LOGOUT_USER"
export const SET_AUTH_ERROR = "AUTH/SET_AUTH_ERROR"
export const CLEAR_AUTH_ERRORS = "AUTH/CLEAR_AUTH_ERRORS"
export const TOGGLE_SESSION_LOADING= "AUTH/TOGGLE_SESSION_LOADING"
export const SET_SESSION_ERR = "AUTH/SET_SESSION_ERR"
export const CLEAN_UP_PROFILE = "AUTH/CLEAN_UP_PROFILE"

// COURSES

export const CLEAN_UP_COURSES = "COURSES/CLEAN_UP_COURSES"
export const CLEAN_UP_DETAILS = "COURSES/CLEAN_UP_DETAILS"
export const GET_COURSE_DETAILS = "COURSES/GET_COURSE_DETAILS"
export const GET_ALL_COURSES = "COURSES/GET_ALL_COURSES"
export const CLEAN_UP_ALL_COURSES = "COURSES/CLEAN_UP_ALL_COURSES"
export const CLEAN_UP_SEARCHED_COURSES = "COURSES/CLEAN_UP_SEARCHED_COURSES"
export const CLEAN_UP_CATEGORY_COURSES = "COURSES/CLEAN_UP_CATEGORY_COURSES"
export const GET_COURSES_BY_QUERY = "COURSES/GET_COURSES_BY_QUERY"
export const SET_SEARCH_ERROR = "COURSES/SET_SEARCH_ERROR"
export const TOGGLE_SEARCH_LOADING = "COURSES/TOGGLE_SEARCH_LOADING"

// COURSE

export const COMMENT_COURSE = "COURSE/COMMENT_COURSE"
export const SET_COURSE_IMAGE = "COURSE/SET_COURSE_IMAGE"
export const CREATE_NEW_COURSE = "COURSE/CREATE_NEW_COURSE"
export const REMOVE_COURSE = "COURSE/REMOVE_COURSE"

// CATEGORIES

export const GET_CATEGORIES = "CATEGORIES/GET_CATEGORIES"
export const SPLIT_BY_CATEGIRES = "CATEGORIES/SPLIT_BY_CATEGIRES"
export const GET_COURSE_BY_CATEGORY = "CATEGORIES/GET_COURSE_BY_CATEGORY"

// PROFILE

export const EDIT_PROFILE = "PROFILE/EDIT_PROFILE"
export const GET_PROFILE = "PROFILE/GET_PROFILE"

// CREATE COURSE

export const NEXT_STEP = "CREATE/NEXT_STEP" 
export const SET_CREATE_ERROR = "CREATE/SET_CREATE_ERROR"
export const TOGGLE_CREATE_LOADING = "CREATE/TOGGLE_CREATE_LOADING"
export const STEP_RESET = "CREATE/STEP_RESET"
export const ADD_LESSON = "CREATE/ADD_LESSON"
export const CREATE_LESSONS = "CREATE/CREATE_LESSONS"
export const REMOVE_LESSON = "CREATE/REMOVE_LESSON"

// PURCHASE COURSE

export const PURCHASE_COURSE = "PURCHASE/PURCHASE_COURSE"
export const TOGGLE_PURCHASE_LOADING = "PURCHASE/TOGGLE_PURCHASE_LOADING"
export const SET_PURCHASE_ERROR = "PURCHASE/SET_PURCHASE_ERROR"

// MY COURSE

export const CLEAN_UP_MY_COURSE = "MYCOURSE/CLEAN_UP_MY_COURSE"
export const TOGGLE_MY_COURSE_LOADING = "MYCOURSE/TOGGLE_MY_COURSE_LOADING"
export const SET_MY_COURSE_ERROR = "MYCOURSE/SET_MY_COURSE_ERROR"
export const SET_MY_COURSE_DATA = "MYCOURSE/SET_MY_COURSE_DATA"
export const SET_MY_COURSE_LESSON = "MYCOURSE/SET_MY_COURSE_LESSON"
export const SAVE_LESSON = "MYCOURSE/SAVE_LESSON"
export const UPDATE_COURSE = "MYCOURSE/UPDATE_COURSE"


// BOUGHT COURSE

export const TOGGLE_BOUGHT_LOADING = "BOUGHT/TOGGLE_BOUGHT_LOADING"
export const SET_BOUGHT_ERROR = "BOUGHT/SET_BOUGHT_ERROR"
export const SET_BOUGHT_COURSE = "BOUGHT/SET_BOUGHT_COURSE"
export const CLEAN_UP_BOUGHT_COURSE = "BOUGHT/CLEAN_UP_BOUGHT_COURSE"
export const SET_LESSON = "BOUGHT/SET_LESSON"