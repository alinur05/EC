import { TOGGLE_PURCHASE_LOADING, SET_PURCHASE_ERROR } from "../types"

const initialState = {
    loading: false,
    error: ''
}

const purchaseReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_PURCHASE_LOADING:
            return {...state, loading: !state.loading}
        case SET_PURCHASE_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}

export default purchaseReducer