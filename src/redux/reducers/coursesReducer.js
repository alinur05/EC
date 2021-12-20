import { CLEAN_UP_ALL_COURSES, CLEAN_UP_DETAILS, COMMENT_COURSE, GET_ALL_COURSES, GET_COURSE_DETAILS, SPLIT_BY_CATEGIRES } from "../types"

const initialState = {
    allCourses: [],
    course: {},
    coursesSplittedByCategories: []
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
        default:    
            return state
    }
}

export default coursesReducer