import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer";
import coursesReducer from "./reducers/coursesReducer";
import sessionReducer from "./reducers/sessionReducer";


const rootReducer = combineReducers({
    session: sessionReducer,
    courses: coursesReducer,
    category: categoryReducer
})

export default rootReducer