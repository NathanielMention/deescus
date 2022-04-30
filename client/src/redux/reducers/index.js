import { combineReducers } from "redux";
import user from "../reducers/userReducer";
import chat from "../reducers/chatReducer";

const rootReducer = combineReducers({
  user,
  chat,
});

export default rootReducer;
