import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise-middleware";
import axios from "axios";

const initialState = {
  user: {},
  lat: null,
  lng: null,
  rooms: []
};

const GET_USER = "GET_USER";
const GET_COORDS = "GET_COORDS";
const GET_ROOMS = "GET_ROOMS";
const ADD_TO_ROOM = "ADD_TO_ROOM";
const LEAVE_ROOM = "LEAVE_ROOM";
const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";
const LOGOUT = "LOGOUT";
const DELETE_ACCOUNT = "DELETE_ACCOUNT";
const EDIT_USERNAME = "EDIT_USERNAME";
const EDIT_IMG = "EDIT_IMG";
const EDIT_PASSWORD = "EDIT_PASSWORD";
const EDIT_HEXCOLOR = "EDIT_HEXCOLOR";

export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/auth/getuser")
  };
}
export function getCoords() {
  return {
    type: GET_COORDS,
    payload: axios.get("/api/getGoogle")
  };
}
export function getRooms(lat, lng) {
  return {
    type: GET_ROOMS,
    payload: axios.post("/api/chat/getrooms", { lat, lng })
  };
}
export function addToRoom(id, lat, lng) {
  return {
    type: ADD_TO_ROOM,
    payload: axios.put("/api/chat/addtoroom", { id, lat, lng })
  };
}
export function leaveRoom(id, lat, lng) {
  return {
    type: LEAVE_ROOM,
    payload: axios.put("/api/chat/leaveroom", { id, lat, lng })
  };
}
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
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${GET_COORDS}_FULFILLED`:
      return {
        ...state,
        lat: action.payload.data.location.lat,
        lng: action.payload.data.location.lng
      };
    case `${GET_ROOMS}_FULFILLED`:
      return {
        ...state,
        rooms: action.payload.data
      };
    case `${ADD_TO_ROOM}_FULFILLED`:
      return {
        ...state,
        rooms: action.payload.data
      };
    case `${LEAVE_ROOM}_FULFILLED`:
      return {
        ...state,
        rooms: action.payload.data
      };
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
