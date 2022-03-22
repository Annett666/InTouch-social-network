import React from "react";
import { Provider } from "react-redux";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import setAuthToken from "./utilts/setAuthToken";

import { setCurrentUser, logout } from "./actions/auth";

import store from "./store";

import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/Header/Header";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import AllPosts from "./components/AllPosts/AllPosts";
import SinglePost from "./components/SinglePost/index";
import UserProfile from "./components/UserProfile/index";
import NotFound from "./components/NotFound";
import Feed from "./components/Feed/index";
import Footer from "./components/Footer/Footer";
import Snackbar from "./components/Snackbar/Snackbar";
import Dialogs from "./components/Dialogs/Dialogs";
import MessagePage from "./components/Dialogs/MessagePage";

if (localStorage.access_token) {
  const { access_token } = localStorage;
  setAuthToken(access_token);
  const decoded = jwtDecode(access_token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logout());
    window.location.href = "/login";
  }
}

class App extends React.Component {
  render() {
    const snackbarContent = store.getState().snackbar.snackbarContent;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <React.Fragment>
            <Header />
            {snackbarContent && <Snackbar />}
            <div className="container">
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route exact path="/" component={AllPosts} />
              <Route path="/post/:id" component={SinglePost} />
              <Switch>
                <PrivateRoute path="/feed" component={Feed} />
                <PrivateRoute path="/dialogs" component={Dialogs} />
              </Switch>
              <Route path="/user/:id" component={UserProfile} />
              <Route path="/dialog/:id" component={MessagePage} />
              <Route path="/404" component={NotFound} />
            </div>
            <Footer />
          </React.Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  snackbarContent: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  snackbarContent: state.snackbar,
});

export default connect(mapStateToProps, {})(App);
