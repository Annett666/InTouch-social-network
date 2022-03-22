import { SET_SNACKBAR_CONTENT } from "../actions/types";

const initialState = {
  snackbarContent: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR_CONTENT:
      return {
        ...state,
        snackbarContent: action.payload,
      };
    default:
      return state;
  }
};
