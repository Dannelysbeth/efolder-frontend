import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  ANOTHER_USER_LOADED_SUCCESS,
  ANOTHER_USER_LOADED_FAIL,
  LOGOUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ROLE_LOADED_SUCCESS,
  ROLE_LOADED_FAIL,
} from "../Actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  accountCreated: null,
  user: null,
  role: null,
  anotherUser: null,
  errors: null,
  message: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.accessToken);
      localStorage.setItem("refresh", payload.refreshToken);
      return {
        ...state,
        errors: null,
        isAuthenticated: true,
        access: payload.accessToken,
        refresh: payload.refreshToken,
        message: "Successfully logged in",
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        erros: null,
        message: "User successfully loaded",
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
        errors: payload,
      };
    case ANOTHER_USER_LOADED_FAIL:
      return {
        ...state,
        anotherUser: null,
        errors: payload,
      };
    case ANOTHER_USER_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        anotherUser: payload,
        errors: null,
        message: "User successfully loaded",
      };

    case ROLE_LOADED_FAIL:
      return {
        ...state,
        role: null,
        errors: payload,
        message: payload,
      };
    case ROLE_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        role: payload,
        errors: null,
        message: "Role successfully loaded",
      };

    case AUTHENTICATED_FAIL:
      return {
        ...state,
        errors: payload,
        isAuthenticated: false,
        message: payload,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        errors: null,
        isAuthenticated: true,
        message: "User successfully authenticated",
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        // isAuthenticated: false,
        accountCreated: true,
        anotherUser: payload,
        errors: null,
        message: "User successfully created",
      };
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        errors: null,
        message: "User successfully logged out",
      };
    case LOGIN_FAIL:
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        errors: payload,
        message: payload,
      };
    case SIGNUP_FAIL:
      // localStorage.removeItem("access");
      // localStorage.removeItem("refresh");
      return {
        ...state,
        // access: null,
        // refresh: null,
        // isAuthenticated: false,
        // user: null,
        errors: payload,
        message: payload,
      };
    default:
      // errors: payload;
      return state;
  }
}
