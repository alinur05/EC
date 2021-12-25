import { SET_SEARCH_ERROR, TOGGLE_SEARCH_LOADING, GET_COURSES_BY_QUERY, CLEAN_UP_CATEGORY_COURSES, CLEAN_UP_SEARCHED_COURSES, GET_COURSE_BY_CATEGORY, CLEAN_UP_ALL_COURSES, CLEAN_UP_DETAILS, COMMENT_COURSE, GET_ALL_COURSES, GET_COURSE_DETAILS, SPLIT_BY_CATEGIRES, LIKE_COURSE, UNLIKE_COURSE } from "../types"

const initialState = {
    allCourses: [],
    course: {},
    categoryCourses: [],
    searchedCourses: [],
    coursesSplittedByCategories: [],
    loading: false,
    error: ""
}

const coursesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_COURSES:
            return {...state, allCourses: action.payload}
        case GET_COURSE_DETAILS: 
            return {...state, course: action.payload}
        case CLEAN_UP_DETAILS:
            return {...state, course: {}}
        case CLEAN_UP_ALL_COURSES:
            return {...state, allCourses: []}
        case SPLIT_BY_CATEGIRES:
            return {...state, coursesSplittedByCategories: action.payload}
        case COMMENT_COURSE:
            return {...state, course: {...state.course, comments: [...state.course.comments, action.payload]}}
        case GET_COURSE_BY_CATEGORY:
            return {...state, categoryCourses: action.payload}
        case CLEAN_UP_SEARCHED_COURSES:
            return {...state, searchedCourses: []}
        case CLEAN_UP_CATEGORY_COURSES:
            return {...state, categoryCourses: []}
        case GET_COURSES_BY_QUERY:
            return {...state, searchedCourses: action.payload}
        case TOGGLE_SEARCH_LOADING:
            return {...state, loading: !state.loading}
        case SET_SEARCH_ERROR:
            return {...state, error: action.payload}
        case LIKE_COURSE:
            console.log(action.payload)
            return {...state, course: {...state.course, likes: [...state.course.likes, action.payload]}}
        case UNLIKE_COURSE:
            console.log(action.payload)
            return {...state, course: {...state.course, likes: [...state.course.likes].filter(item => item.id !== action.payload.id)}}
        default:    
            return state
    }
}

export default coursesReducer