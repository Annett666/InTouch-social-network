import {
  UNEXPECTED_ERROR,
  ERROR_LOGIN,
  ERROR_REGISTER,
  POST_ADDED,
  POST_REMOVED,
  COMMENT_ADDED,
  COMMENT_REMOVED,
  LOG_OUT,
} from "./SnackbarContentTypes";

export const SNACKBAR_CONTENT = {
  [ERROR_LOGIN]: "Invalid credentials",
  [ERROR_REGISTER]: "Email already exists",
  [UNEXPECTED_ERROR]: "Something was wrong",
  [POST_ADDED]: "The post has been added!",
  [POST_REMOVED]: "The post has been removed!",
  [COMMENT_ADDED]: "The comment has been added!",
  [COMMENT_REMOVED]: "The comment has been removed!",
  [LOG_OUT]: "You have been logged out!",
};
