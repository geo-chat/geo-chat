import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import axios from "axios";

initialState = {
  username: "",
  password: "",
  loggedIn: false
};
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";

export function login() {
  return {
    type: LOGIN,
    payload: axios.post("api/auth/login", { username, password })
  };
}
export function signup() {
  return {
    type: SIGNUP,
    payload: axios.post("api/auth/signup", { username, password })
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        password: "",
        loggedIn: true
      };
    case `${SIGNUP}_FULFILLED`:
      return {
        ...state,
        password: "",
        loggedIn: true
      };
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(promise));
