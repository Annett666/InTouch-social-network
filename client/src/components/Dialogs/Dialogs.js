import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAll as getAllSubscriptions } from "../../actions/subscription";

import Loader from "../Loader/index";
import DialogItem from "./DialogItem";

class Dialogs extends React.Component {
  componentDidMount() {
    this.props.getAllSubscriptions({ subscriber: this.props.auth.user.id });
  }

  render() {
    const { isLoading, subscriptions } = this.props.subscription;
    return !isLoading ? (
      <div className="row mt-4">
        <div className="col-md-6 mx-auto">
          {subscriptions.length !== 0 ? (
            <DialogItem subscriptions={subscriptions} />
          ) : (
            <div className="text-center">
              <h2>You have no subscriptions</h2>
            </div>
          )}
        </div>
      </div>
    ) : (
      <Loader />
    );
  }
}

Dialogs.propTypes = {
  getAllSubscriptions: PropTypes.func.isRequired,
  subscription: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  subscription: state.subscription,
  auth: state.auth,
});

export default connect(mapStateToProps, { getAllSubscriptions })(Dialogs);
