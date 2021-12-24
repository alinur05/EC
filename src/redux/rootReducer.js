import { combineReducers } from "redux";
import boughtCourseReducer from "./reducers/boughtCourseReducer";
import categoryReducer from "./reducers/categoryReducer";
import coursesReducer from "./reducers/coursesReducer";
import createCourseReducer from "./reducers/createCourseReducer";
import myCourseReducer from "./reducers/myCourseReducer";
import purchaseReducer from "./reducers/purchaseReducer";
import sessionReducer from "./reducers/sessionReducer";


const rootReducer = combineReducers({
    session: sessionReducer,
    courses: coursesReducer,
    category: categoryReducer,
    create: createCourseReducer,
    myCourse: myCourseReducer,
    bought: boughtCourseReducer,
    purchase: purchaseReducer
})

export default rootReducer