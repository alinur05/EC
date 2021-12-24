import { SET_BOUGHT_COURSE, SET_BOUGHT_ERROR, TOGGLE_BOUGHT_LOADING } from "../types"

const initialState = {
    data: {},
    loading: false,
    error: ""
}

const boughtCourseReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_BOUGHT_LOADING:
            return {...state, loading: !state.loading}
        case SET_BOUGHT_ERROR:
            return {...state, error: action.payload}
        case SET_BOUGHT_COURSE:
            return {...state, error: action.payload}
        default:
            return state
    }
}

export default boughtCourseReducer