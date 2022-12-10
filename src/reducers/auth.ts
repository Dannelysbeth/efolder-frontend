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
  FILE_UPLOAD_FILE_SUCCESS,
  FILE_UPLOAD_FILE_FAIL,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  TEAM_CREATE_SUCCESS,
  TEAM_CREATE_FAIL,
} from "../Actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  accountCreated: null,
  user: null,
  team: null,
  role: null,
  anotherUser: null,
  errors: null,
  RoleErrors: null,
  message: null,
  fileSuccessMessage: null,
  selectedFile: null,
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
        fileSuccessMessage: null,
        message: "Successfully logged in",
      };
    case USER_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        erros: null,
        fileSuccessMessage: null,
        message: "User successfully loaded",
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        user: null,
        errors: payload,
        fileSuccessMessage: null,
        message: null,
      };
    case ANOTHER_USER_LOADED_FAIL:
      return {
        ...state,
        anotherUser: null,
        errors: payload,
        fileSuccessMessage: null,
        message: null,
      };
    case ANOTHER_USER_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        anotherUser: payload,
        errors: null,
        fileSuccessMessage: null,
        message: "User successfully loaded",
      };

    case ROLE_LOADED_FAIL:
      return {
        ...state,
        role: null,
        RoleErrors: payload,
        fileSuccessMessage: null,
        message: null,
      };
    case ROLE_LOADED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        role: payload,
        RoleErrors: null,
        fileSuccessMessage: null,
        message: "Role successfully loaded",
      };

    case AUTHENTICATED_FAIL:
      return {
        ...state,
        errors: payload,
        fileSuccessMessage: null,
        isAuthenticated: false,
        message: null,
      };
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        errors: null,
        fileSuccessMessage: null,
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
        fileSuccessMessage: null,
        message: "User successfully created",
      };
    case TEAM_CREATE_SUCCESS:
      return {
        ...state,
        team: payload,
        errors: null,
      };
    case TEAM_CREATE_FAIL:
      return {
        ...state,
        team: null,
        errors: payload,
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
        fileSuccessMessage: null,
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
        fileSuccessMessage: null,
        message: null,
      };
    case SIGNUP_FAIL:
      // localStorage.removeItem("access");
      // localStorage.removeItem("refresh");
      return {
        ...state,

        errors: payload,
        fileSuccessMessage: null,
        message: payload,
      };
    case FILE_UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        errors: null,
        fileSuccessMessage: "Dokument został poprawnie dodany",
        message: "Dokument został poprawnie dodany",
      };
    case FILE_UPLOAD_FILE_FAIL:
      return {
        ...state,
        errors: payload,
        fileSuccessMessage: null,
        message: null,
      };
    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        errors: null,
        fileSuccessMessage: null,
        message: "Haslo zostało zmienione",
      };
    case PASSWORD_CHANGE_FAIL:
      return {
        ...state,
        errors: payload,
        fileSuccessMessage: null,
        message: null,
      };
    default:
      // errors: payload;
      return state;
  }
}
