import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import axios from "axios";

const initialState = {
  user: {}
};
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const LOGOUT = "LOGOUT";
const DELETE_ACCOUNT = "DELETE_ACCOUNT";
const EDIT_USERNAME = "EDIT_USERNAME";
const EDIT_IMG = "EDIT_IMG";
const EDIT_PASSWORD = "EDIT_PASSWORD";
const EDIT_HEXCOLOR = "EDIT_HEXCOLOR";

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
export function logout() {
  return {
    type: LOGOUT,
    payload: axios.delete("/api/auth/logout")
  };
}
export function deleteAccount() {
  return {
    type: DELETE_ACCOUNT,
    payload: axios.delete("/api/auth/deleteaccount")
  };
}
export function editUsername(username) {
  return {
    type: EDIT_USERNAME,
    payload: axios.put("/api/auth/editusername", { username })
  };
}
export function editImg(img) {
  return {
    type: EDIT_IMG,
    payload: axios.put("/api/auth/editimg", { img })
  };
}
export function editHexcolor(hexcolor) {
  return {
    type: EDIT_HEXCOLOR,
    payload: axios.put("/api/auth/edithexcolor", { hexcolor })
  };
}
export function editPassword(oldPassword, newPassword) {
  return {
    type: EDIT_PASSWORD,
    payload: axios.put("api/auth/editpassword", { oldPassword, newPassword })
  };
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${SIGNUP}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        user: {}
      };
    case `${DELETE_ACCOUNT}_FULFILLED`:
      return {
        ...state,
        user: {}
      };
    case `${EDIT_USERNAME}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${EDIT_IMG}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${EDIT_HEXCOLOR}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${EDIT_PASSWORD}_FULFILLED`:
      return state;
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(promise));
