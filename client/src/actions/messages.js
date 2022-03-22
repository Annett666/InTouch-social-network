import axios from "axios";

import {
  POST_LOADING,
  ADD_POST,
  UPDATE_POST,
  UPDATE_POSTS,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  CLEAR_POSTS,
} from "./types";

import {
  UNEXPECTED_ERROR,
  POST_ADDED,
  POST_REMOVED,
  COMMENT_ADDED,
  COMMENT_REMOVED,
} from "../constants/SnackbarContentTypes";

import { setSnackbarContent } from "./snackbar";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  },
};

export const create = (post) => (dispatch) => {
  axios
    .post("/api/posts", post, config)
    .then(
      (res) =>
        dispatch({
          type: ADD_POST,
          payload: res.data,
        }),
      dispatch(setSnackbarContent(POST_ADDED))
    )
    .catch(() => {
      dispatch(setSnackbarContent(UNEXPECTED_ERROR));
    });
};

export const getAll = (params) => (dispatch) => {
  dispatch(setPostLoading(true));
  axios
    .get("/api/posts", { params }, config)
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: {
          posts: res.data,
          totalCount: +res.headers["x-total-count"],
        },
      })
    )
    .catch((e) => {
      dispatch(setPostLoading(false));
      dispatch(clearPosts());
    });
};

export const getById = (id) => (dispatch) => {
  dispatch(setPostLoading(true));
  axios
    .get(`/api/posts/${id}`, config)
    .then((res) => {
      dispatch({
        type: GET_POST,
        payload: res.data,
      });
    })
    .catch((e) => {
      dispatch(setPostLoading(false));
    });
};

export const remove = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/${id}`, config)
    .then(
      (res) =>
        dispatch({
          type: DELETE_POST,
          payload: id,
        }),
      dispatch(setSnackbarContent(POST_REMOVED))
    )
    .catch(() => {
      dispatch(setSnackbarContent(UNEXPECTED_ERROR));
    });
};

export const createLike = (postId, TYPE) => (dispatch) => {
  axios.post(`/api/posts/${postId}/likes`, null, config).then((res) =>
    dispatch({
      type: TYPE,
      payload: res.data,
    })
  );
};

export const removeLike = (postId, likeId, TYPE) => (dispatch) => {
  axios.delete(`/api/posts/${postId}/likes/${likeId}`, config).then((res) =>
    dispatch({
      type: TYPE,
      payload: res.data,
    })
  );
};

export const createComment = (postId, comment) => (dispatch) => {
  axios
    .post(`/api/posts/${postId}/comments`, comment, config)
    .then(
      (res) =>
        dispatch({
          type: UPDATE_POST,
          payload: res.data,
        }),
      dispatch(setSnackbarContent(COMMENT_ADDED))
    )
    .catch(() => {
      dispatch(setSnackbarContent(UNEXPECTED_ERROR));
    });
};

export const removeComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/api/posts/${postId}/comments/${commentId}`, config)
    .then(
      (res) =>
        dispatch({
          type: UPDATE_POST,
          payload: res.data,
        }),
      dispatch(setSnackbarContent(COMMENT_REMOVED))
    )
    .catch(() => {
      dispatch(setSnackbarContent(UNEXPECTED_ERROR));
    });
};

const clearPosts = () => {
  return {
    type: CLEAR_POSTS,
  };
};

const setPostLoading = (isLoading) => {
  return {
    type: POST_LOADING,
    payload: isLoading,
  };
};
