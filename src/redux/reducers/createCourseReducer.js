import {CREATE_NEW_COURSE, NEXT_STEP, SET_CREATE_ERROR, STEP_RESET, TOGGLE_CREATE_LOADING} from '../types'

const initialState = {
    loading: false,
    error: "",
    step: 1,
    data: {}
}

const createCourseReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_NEW_COURSE:
            console.log(action.payload)
            return {...state, data: action.payload}
        case SET_CREATE_ERROR:
            return {...state, error: action.payload}
        case NEXT_STEP:
            return {...state, step: state.step + 1}
        case STEP_RESET:
            return {...state, step: 1, error: '', data: {}, loading: false}
        case TOGGLE_CREATE_LOADING:
            return {...state, loading: !state.loading}
        default:
            return state
    }
}


export default createCourseReducer