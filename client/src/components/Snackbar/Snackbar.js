import React from "react";
import store from "../../store";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SNACKBAR_CONTENT } from "../../constants/snackbarConstants";
import CloseIcon from "../../assets/CloseIcon";
import { setSnackbarContent } from "../../actions/snackbar.js";

class Snackbar extends React.Component {
  onClose = () => {
    this.props.dispatch(setSnackbarContent(null));
  };

  componentDidMount() {
    setTimeout(this.onClose, 5000);
  }

  render() {
    const snackbarContent = store.getState().snackbar.snackbarContent;
    return (
      <div className="snackbar">
        <div className="snackbar-container">
          {snackbarContent && SNACKBAR_CONTENT[snackbarContent]}
          <button className="close-btn" onClick={this.onClose}>
            <CloseIcon />
          </button>
        </div>
      </div>
    );
  }
}

Snackbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
