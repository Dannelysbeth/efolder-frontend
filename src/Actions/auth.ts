import axios from "axios";
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
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  ROLE_LOADED_SUCCESS,
  ROLE_LOADED_FAIL,
  FILE_UPLOAD_FILE_SUCCESS,
  FILE_UPLOAD_FILE_FAIL,
} from "./types";

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_REMOTE_URL}/api/user/info`,
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const loadAnotherUser = (username: string) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_REMOTE_URL}/api/user/${username}`,
        config
      );

      dispatch({
        type: ANOTHER_USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ANOTHER_USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: ANOTHER_USER_LOADED_FAIL,
    });
  }
};

export const RolesLoad = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_REMOTE_URL}/api/role`,
        config
      );

      dispatch({
        type: ROLE_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: ROLE_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: ROLE_LOADED_FAIL,
    });
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    console.log(localStorage.getItem("access"));

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_REMOTE_URL}/api/auth/verify`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const login =
  (username: string, password: string) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const body = new URLSearchParams({
      username: username,
      password: password,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_REMOTE_URL}/api/login`,
        body,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
      });
    }
  };
export const uploadFile = (fileType: string, file) => async (dispatch) => {
  console.log(file);
  //
  let data = new FormData();
  data.append("file", file, file.name);
  // data.append("filename", file.ame);

  // formData.append("file", file.na);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "*/*",
    },
  };

  const body = new URLSearchParams({
    // file: document,
  });
  // console.log(document);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_REMOTE_URL}/api/document/upload/${fileType}`,

      data,
      config
    );

    dispatch({
      type: FILE_UPLOAD_FILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data);
    dispatch({
      type: FILE_UPLOAD_FILE_FAIL,
      payload: err.response.data,
    });
  }
};

export const signup =
  (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    middleName: string,
    birthdate: Date,
    gender: string,
    imageUrl: string
  ) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "*/*",
      },
    };

    const body = JSON.stringify({
      username,
      password,
      email,
      firstName,
      lastName,
      middleName,
      birthdate,
      gender,
      imageUrl,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_REMOTE_URL}/api/user`,
        body,
        config
      );
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response); //TODO
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.response.data,
      });
    }
  };

export const extendedSignup =
  (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    middleName: string,
    teamName: string,
    hrManager: string,
    positionName: string,
    positionDescription: string,
    country: string,
    city: string,
    zipcode: string,
    street: string,
    buildingNumber: string,
    flatNumber: string,
    county: string
  ) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "*/*",
      },
    };

    const body = JSON.stringify({
      user: {
        username,
        password,
        email,
        firstName,
        lastName,
        middleName,
      },
      employment: {
        teamName,
        hrManager,
        positionName,
        positionDescription,
      },
      address: {
        country,
        city,
        zipcode,
        street,
        buildingNumber,
        flatNumber,
        county,
      },
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_REMOTE_URL}/api/employment/create`,
        body,
        config
      );
      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response); //TODO
      dispatch({
        type: SIGNUP_FAIL,
        payload: err.response.data,
      });
    }
  };

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
