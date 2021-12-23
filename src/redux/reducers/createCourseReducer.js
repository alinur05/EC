import {REMOVE_LESSON, ADD_LESSON, CREATE_NEW_COURSE, NEXT_STEP, SET_COURSE_IMAGE, SET_CREATE_ERROR, STEP_RESET, TOGGLE_CREATE_LOADING} from '../types'

const initialState = {
    loading: false,
    error: "",
    step: 1,
    data: {},
    lessons: []
}

const createCourseReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_NEW_COURSE:
            return {...state, data: action.payload}
        case SET_CREATE_ERROR:
            return {...state, error: action.payload}
        case NEXT_STEP:
            return {...state, step: state.step + 1}
        case STEP_RESET:
            return {...state, step: 1, error: '', data: {}, loading: false, lessons: [], data: {}}
        case TOGGLE_CREATE_LOADING:
            return {...state, loading: !state.loading}
        case ADD_LESSON:
            const id = state.lessons.length || 0
            return {...state, lessons: [...state.lessons, {...action.payload, id: id + 1}]}
        case SET_COURSE_IMAGE:
            return {...state, data: {...state.data, imageModel: action.payload}}
        case REMOVE_LESSON:
            return {...state, lessons: [...state.lessons].filter(item => item.id !== action.payload)}
        default:
            return state
    }
}


export default createCourseReducer