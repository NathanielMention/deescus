import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  GET_USER,
  UPDATE_USER,
} from "../actions/actionType";

export default function (state = {}, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, user: action.payload.user };
    case LOGIN_USER:
      return { ...state, user: action.payload.user };
    case LOGOUT_USER:
      return { ...state, user: {} };
    case GET_USER:
      return { ...state, user: action.payload };
    case UPDATE_USER:
      return { ...state, user: Object.assign(state.user, action.payload) };
    default:
      return state;
  }
}
