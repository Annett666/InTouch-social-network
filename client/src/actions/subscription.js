import axios from "axios";
import { getConfig } from "../utilts/getConfig";

import {
  SUBSCRIPTION_LOADING,
  ADD_SUBSCRIPTION,
  GET_SUBSCRIPTIONS,
  DELETE_SUBSCRIPTION,
} from "./types";

// const config = {
//   headers: {
//     Authorization: "Bearer " + localStorage.getItem("access_token"),
//   },
// };

export const create = (subscription) => (dispatch) => {
  axios.post("/api/subscriptions", subscription, getConfig()).then((res) =>
    dispatch({
      type: ADD_SUBSCRIPTION,
      payload: res.data,
    })
  );
};

export const getAll =
  (params = {}) =>
  (dispatch) => {
    dispatch(setSubscriptionLoading(true));
    axios
      .get("/api/subscriptions", { params }, getConfig())
      .then((res) => {
        dispatch({
          type: GET_SUBSCRIPTIONS,
          payload: res.data,
        });
      })
      .catch((e) => {
        dispatch(setSubscriptionLoading(false));
      });
  };

export const remove = (id) => (dispatch) => {
  axios.delete(`/api/subscriptions/${id}`, getConfig()).then((res) =>
    dispatch({
      type: DELETE_SUBSCRIPTION,
      payload: id,
    })
  );
};

const setSubscriptionLoading = (isLoading) => {
  return {
    type: SUBSCRIPTION_LOADING,
    payload: isLoading,
  };
};
