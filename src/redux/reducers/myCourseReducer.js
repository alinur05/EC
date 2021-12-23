import { CLEAN_UP_MY_COURSE, TOGGLE_MY_COURSE_LOADING, SET_MY_COURSE_ERROR, SET_MY_COURSE_DATA} from '../types'

const initialState = {
    myCourse: {},
    loading: false,
    error: ''
}   

const myCourseReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_MY_COURSE_LOADING:
            return {...state, loading: !state.loading}
        case SET_MY_COURSE_ERROR:
            return {...state, error: action.payload}
        case SET_MY_COURSE_DATA:
            return {...state, myCourse: {}}
        case CLEAN_UP_MY_COURSE:
            return {...state, myCourse: {}, loading: false, error: ''}
        default:
            return state
    }
}

export default myCourseReducer