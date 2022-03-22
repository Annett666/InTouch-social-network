import React from "react";

import { connect } from "react-redux";
import Quill from "react-quill";
import PropTypes from "prop-types";

import { createComment } from "../../actions/post";
import HelpIcon from "../../assets/HelpIcon";

class CommentForm extends React.Component {
  constructor() {
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
    const { body } = this.state;
    this.props.createComment(this.props.postId, this.state);
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
                placeholder="What do you think?"
                theme="snow"
                modules={{ toolbar: false }}
                value={this.state.body}
                onChange={this.onChangeBody}
              />
            </div>
            <div className="button-container btn-group">
              <button type="submit" className="btn btn-dark">
                Comment
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
                    Write what do you think about this post
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

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { createComment })(CommentForm);
