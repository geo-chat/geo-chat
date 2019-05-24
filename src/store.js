import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import axios from "axios";

const initialState = {
  username: "",
  id: 0
};
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";

export function login(username, password) {
  return {
    type: LOGIN,
    payload: axios.post("/api/auth/login", { username, password })
  };
}
export function signup(username, password) {
  return {
    type: SIGNUP,
    payload: axios.post("/api/auth/signup", { username, password })
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id
      };
    case `${SIGNUP}_FULFILLED`:
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id
      };
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(promise));
