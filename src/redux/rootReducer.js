import { combineReducers } from "redux";
import sessionReducer from "./reducers/sesstionReducer";

const rootReducer = combineReducers({
    session: sessionReducer
})

export default rootReducer