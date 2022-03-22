import axios from "axios";
import jwtDecode from "jwt-decode";

import { SET_CURRENT_USER } from "./types";
import setAuthToken from "../utilts/setAuthToken";

import {
  ERROR_LOGIN,
  ERROR_REGISTER,
  LOG_OUT,
} from "../constants/SnackbarContentTypes";

import { setSnackbarContent } from "./snackbar";

export const register = (userData, history) => (dispatch) => {
  axios
    .post("/api/auth/register", userData)
    .then((res) => history.push("/login"))
    .catch(() => {
      dispatch(setSnackbarContent(ERROR_REGISTER));
    });
};

export const login = (userData) => (dispatch) => {
  axios
    .post("/api/auth/login", userData)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("access_token", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((e) => {
      dispatch(setSnackbarContent(ERROR_LOGIN));
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("access_token");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  dispatch(setSnackbarContent(LOG_OUT));
};

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});
