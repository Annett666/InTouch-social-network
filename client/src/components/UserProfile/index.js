import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getUserById } from "../../actions/user";

import PostForm from "../Posts/PostForm";
import Posts from "../Posts/Posts";
import ProfileImage from "../Posts/ProfileImage";
import Subscription from "./Subscription";
import store from "../../store";

class UserProfile extends React.Component {
  componentDidMount() {
    this.props.getUserById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user.isLoading && nextProps.user.user === null) {
      this.props.history.push("/404");
    }
  }

  render() {
    const {
      user: { user, isLoading },
      auth,
    } = this.props;
    const { subscriptions } = store.getState().subscription;
    const sub = subscriptions.filter((s) => s.profile !== s.subscriber);
    return (
      !isLoading &&
      user !== null && (
        <React.Fragment>
          <div className="row mt-5">
            <div className="col-md-6 mx-auto">
              <div className="row">
                <div className="col-8">
                  <h2 className="profile-username">{user.name}</h2>
                  <p>
                    <strong>Registered: </strong>
                    {new Date(user.createdDate).toDateString()}
                  </p>
                  {auth.user.id === user._id && (
                    <strong>Subscribers: {sub.length}</strong>
                  )}
                  <p>
                    {auth.user.id === user._id && (
                      <a href="https://ru.gravatar.com/" target="_blank">
                        Change photo
                      </a>
                    )}
                  </p>
                </div>
                <div className="col-4 text-center">
                  <ProfileImage user={user} />
                </div>
              </div>
            </div>
          </div>
          {!(auth.user.id === user._id) && (
            <div className="row mt-4">
              <div className="col-md-12 text-center">
                <div className="col-4 mx-auto">
                  <Subscription userId={user._id} />
                </div>
              </div>
            </div>
          )}
          <div className="row mt-4">
            <div className="col-md-6 mx-auto">
              {auth.user.id === user._id && <PostForm />}
              <Posts queryParams={{ user: user._id }} />
            </div>
          </div>
        </React.Fragment>
      )
    );
  }
}

UserProfile.propTypes = {
  getUserById: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { getUserById })(UserProfile);
