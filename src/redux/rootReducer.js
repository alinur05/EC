import { combineReducers } from "redux";
import categoryReducer from "./reducers/categoryReducer";
import coursesReducer from "./reducers/coursesReducer";
import createCourseReducer from "./reducers/createCourseReducer";
import sessionReducer from "./reducers/sessionReducer";


const rootReducer = combineReducers({
    session: sessionReducer,
    courses: coursesReducer,
    category: categoryReducer,
    create: createCourseReducer
})

export default rootReducer