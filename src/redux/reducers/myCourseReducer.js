import { ConsoleSqlOutlined } from '@ant-design/icons'
import { REMOVE_LESSON, SAVE_LESSON, CLEAN_UP_MY_COURSE, TOGGLE_MY_COURSE_LOADING, SET_MY_COURSE_ERROR, SET_MY_COURSE_DATA, SET_MY_COURSE_LESSON} from '../types'

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
            return {...state, myCourse: action.payload}
        case CLEAN_UP_MY_COURSE:
            return {...state, myCourse: {}, loading: false, error: ''}
        case SET_MY_COURSE_LESSON:
            return {...state, myCourse: {...state.myCourse, lessons: [...state.myCourse.lessons, action.payload]}}
        case SAVE_LESSON:
            let newLessons = [...state.myCourse.lessons]
            const ind = newLessons.findIndex(item => item.id === action.payload.id)
            newLessons.splice(ind, 1, action.payload)
            return {...state, myCourse: {...state.myCourse, lessons: newLessons}
            }
        case REMOVE_LESSON:
            console.log(action.payload)
            return {...state, myCourse: {...state.myCourse, lessons: [...state.myCourse.lessons].filter(item => item.id !== action.payload.id)}}
        default:
            return state
    }
}

export default myCourseReducer