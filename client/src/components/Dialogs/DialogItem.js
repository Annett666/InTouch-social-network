import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ProfileImage from "../Posts/ProfileImage";

class DialogItem extends React.Component {
  render() {
    const { subscriptions } = this.props;
    return (
      <React.Fragment>
        {subscriptions.subscriptions.map((subscriber) => (
          <div className="mr-2">
            <Link to={"/dialog/" + subscriber.profile}>
              <p>{subscriber.profile}</p>
            </Link>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

DialogItem.propTypes = {
  subscriptions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  subscriptions: state.subscription,
  auth: state.auth,
});

export default connect(mapStateToProps)(DialogItem);
