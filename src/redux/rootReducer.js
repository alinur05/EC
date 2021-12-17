import { combineReducers } from "redux";
import coursesReducer from "./reducers/coursesReducer";
import sessionReducer from "./reducers/sessionReducer";


const rootReducer = combineReducers({
    session: sessionReducer,
    courses: coursesReducer
})

export default rootReducer