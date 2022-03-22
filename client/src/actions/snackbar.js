import { SET_SNACKBAR_CONTENT } from "./types";

export const setSnackbarContent = (snackbarContent) => ({
  type: SET_SNACKBAR_CONTENT,
  payload: snackbarContent,
});
