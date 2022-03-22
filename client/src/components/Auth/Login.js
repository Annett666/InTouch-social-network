import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { login } from "../../actions/auth";
import HelpIcon from "../../assets/HelpIcon";

class Login extends React.Component {
  constructor() {
    super();
    this.onShowTooltip = this.onShowTooltip.bind(this);
    this.onHideTooltip = this.onHideTooltip.bind(this);
    this.state = {
      email: "",
      password: "",
      showTooltip: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth.isAuthenticated) {
      this.props.history?.push("/");
    }
  }

  onShowTooltip() {
    this.setState({ showTooltip: true });
  }

  onHideTooltip() {
    this.setState({ showTooltip: false });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state);
  };

  render() {
    const { showTooltip } = this.state;
    return (
      <div className="row mt-4">
        <div className="data-form mx-auto">
          <div className="card">
            <article className="card-body">
              <h4 className="card-title text-center mb-4 mt-1">Log In</h4>
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
                      required
                    />
                  </div>
                </div>
                <div className="button-container btn-group form-group">
                  <button type="submit" className="btn btn-dark btn-block">
                    Login
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
                        Log in to your account using email and password
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { login })(Login);
