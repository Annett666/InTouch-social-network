import { combineReducers } from "redux";

import auth from "./auth";
import post from "./post";
import user from "./user";
import subscription from "./subscription";
import snackbar from "./snackbar";

export default combineReducers({ auth, post, user, subscription, snackbar });
