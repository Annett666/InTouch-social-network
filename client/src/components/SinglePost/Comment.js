import React from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { removeComment } from "../../actions/post";

import ProfileImage from "../Posts/ProfileImage";

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = {
      showDropdown: false,
    };
  }

  onClick() {
    this.setState({ showDropdown: !this.state.showDropdown });
  }

  onDelete = () => {
    this.props.removeComment(this.props.postId, this.props.comment._id);
  };

  render() {
    const { showDropdown } = this.state;
    const { comment, auth } = this.props;
    return (
      <div className="card mb-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-10">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mr-2">
                    <ProfileImage user={comment.user} width="50" />
                  </div>
                  <div className="ml-2">
                    <div className="h5 m-0">{comment.user.name}</div>
                    <div className="h7 text-muted">
                      <i className="fa fa-clock-o"></i>{" "}
                      {new Date(comment.createdDate).toDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2 text-right">
              {auth.isAuthenticated && auth.user.id === comment.user._id && (
                <div className="dropdown">
                  <button
                    className="btn btn-link dropdown-toggle"
                    type="button"
                    id="drop"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={this.onClick}
                  ></button>
                  <div
                    className={
                      showDropdown
                        ? "dropdown-menu dropdown-menu-right dropdown-menu_shown"
                        : "dropdown-menu dropdown-menu-right"
                    }
                    aria-labelledby="drop"
                  >
                    <a
                      className="dropdown-item"
                      role="button"
                      onClick={this.onDelete}
                    >
                      Remove
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="card-body">
              {comment.body.substring(3, comment.body.length - 4)}
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12" ref="body"></div>
          </div>
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  removeComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { removeComment })(Comment);
