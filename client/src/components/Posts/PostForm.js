import React from "react";

import { connect } from "react-redux";
import Quill from "react-quill";
import PropTypes from "prop-types";

import { create } from "../../actions/post";

import HelpIcon from "../../assets/HelpIcon";

class PostForm extends React.Component {
  constructor(props) {
    super();
    this.onShowTooltip = this.onShowTooltip.bind(this);
    this.onHideTooltip = this.onHideTooltip.bind(this);
    this.state = { body: "", showTooltip: false };
  }

  onShowTooltip() {
    this.setState({ showTooltip: true });
  }

  onHideTooltip() {
    this.setState({ showTooltip: false });
  }

  onChangeBody = (body) => this.setState({ body });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.create(this.state);
    this.setState({ body: "" });
  };

  render() {
    const { showTooltip } = this.state;
    return (
      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <Quill
                placeholder="What's up?"
                theme="snow"
                modules={{
                  toolbar: [
                    ["bold", "italic", "underline", "strike"],
                    ["link", "image", "video"],
                  ],
                }}
                value={this.state.body}
                onChange={this.onChangeBody}
              />
            </div>
            <div className="button-container btn-group float-right">
              <button type="submit" className="btn btn-dark">
                Share
              </button>
              <div
                onMouseEnter={this.onShowTooltip}
                onMouseLeave={this.onHideTooltip}
              >
                <HelpIcon />
                <div
                  className={
                    showTooltip
                      ? "dropdown-menu dropdown-menu-right tooltip_shown"
                      : "dropdown-menu dropdown-menu-right"
                  }
                  aria-labelledby="drop"
                >
                  <p className="tooltip-text">
                    Write about your news and share it with friends
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  create: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { create })(PostForm);
