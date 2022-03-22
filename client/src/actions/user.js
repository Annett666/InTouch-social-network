import axios from "axios";
import { getConfig } from "../utilts/getConfig";

import { USER_LOADING, GET_USER } from "./types";

export const getUserById = (id) => (dispatch) => {
  dispatch(setUserLoading(true));
  axios
    .get(`/api/users/${id}`, getConfig())
    .then((res) => {
      dispatch({
        type: GET_USER,
        payload: res.data,
      });
    })
    .catch((e) => {
      dispatch(setUserLoading(false));
    });
};

const setUserLoading = (isLoading) => {
  return {
    type: USER_LOADING,
    payload: isLoading,
  };
};
