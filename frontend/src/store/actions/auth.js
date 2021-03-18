import * as actionTypes from "./actionTypes";
import axios from "axios";
require("dotenv").config();
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const SERVER_URI = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://ksu-number-cruncher.herokuapp.com"
  } else {
    return "http://localhost:8000"
  }
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, is_admin = false, user = "") => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    is_admin: is_admin,
    user: user,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("is_admin");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("user");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${SERVER_URI()}/api/account/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.token;
        const is_admin = res.data.is_admin;
        const user = res.data.first_name.substring(0, 1).toLowerCase() + res.data.last_name.substring(0, 1).toLowerCase();
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("is_admin", is_admin);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("user", user);
        dispatch(authSuccess(token, is_admin, user));
        window.location.replace("/dashboard");
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
        window.location.href = "/";
      });
  };
};

export const authSignup = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`${SERVER_URI()}/api/account/register/`, {
        username: username,
        email: email,
        password: password1,
        password2: password2,
      })
      .then((res) => {
        const token = res.data.key;
        const is_admin = res.data.is_admin;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("is_admin", is_admin);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        window.location.replace("/dashboard");
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
        window.location.replace("/signup");
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const is_admin = localStorage.getItem("is_admin");
    if (token === undefined) {
      dispatch(authLogout());
      window.location.replace("/login");
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        dispatch(authSuccess(token, is_admin));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};