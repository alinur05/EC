import { CLEAN_UP_DETAILS, GET_COURSES, GET_COURSE_DETAILS } from "../types"

const initialState = {
    courses: [],
    course: {}
}

const coursesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_COURSES:
            return {...state, courses: action.payload}
        case GET_COURSE_DETAILS: 
            const course = [...state.courses].find(item => item.courseModel.id == action.payload)
            return {...state, course: course}
        case CLEAN_UP_DETAILS:
            return {...state, course: {}}
        default:    
            return state
    }
}

export default coursesReducer