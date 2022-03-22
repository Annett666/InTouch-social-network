import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { register } from "../../actions/auth";
import HelpIcon from "../../assets/HelpIcon";

class Register extends React.Component {
  constructor() {
    super();
    this.onShowTooltip = this.onShowTooltip.bind(this);
    this.onHideTooltip = this.onHideTooltip.bind(this);
    this.state = {
      name: "",
      email: "",
      password: "",
      showTooltip: false,
    };
  }

  onShowTooltip() {
    this.setState({ showTooltip: true });
  }

  onHideTooltip() {
    this.setState({ showTooltip: false });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.register(this.state, this.props.history);
  };

  render() {
    const { showTooltip } = this.state;
    return (
      <div className="row mt-4">
        <div className="data-form mx-auto">
          <div className="card">
            <article className="card-body">
              <h4 className="card-title text-center mb-4 mt-1">Registration</h4>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      pattern=".{3,20}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      pattern=".{5,30}"
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                    <input
                      className="form-control"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      pattern=".{6,30}"
                    />
                  </div>
                </div>
                <div className="button-container btn-group form-group">
                  <button type="submit" className="btn btn-dark btn-block">
                    Register
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
                        Create your account using name, email and password
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </article>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { register })(Register);
