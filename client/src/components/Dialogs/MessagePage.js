import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class MessagePage extends React.Component {
  render() {
    const user = this.props.match.params.id;
    return (
      <React.Fragment>
        <p>{user}</p>
        <textarea />
        <button>Send</button>
      </React.Fragment>
    );
  }
}

MessagePage.propTypes = {
  subscriptions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  subscriptions: state.subscription,
  auth: state.auth,
});

export default connect(mapStateToProps)(MessagePage);
