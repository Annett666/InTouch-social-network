import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

class Header extends React.Component {
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

  onCloseDroprown() {
    this.setState({ showDropdown: false });
  }

  onLogout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    const { showDropdown } = this.state;
    const { isAuthenticated, user } = this.props.auth;
    let links;
    if (isAuthenticated) {
      links = (
        <React.Fragment>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={this.onClick}
            >
              <i className="fa fa-user"></i>
              Account
            </a>
            <div
              className={
                showDropdown
                  ? "dropdown-menu dropdown-menu_shown"
                  : "dropdown-menu"
              }
              aria-labelledby="navbarDropdown"
            >
              <Link className="dropdown-item" to={"/user/" + user.id}>
                My Profile
              </Link>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="/#" onClick={this.onLogout}>
                Log Out
              </a>
            </div>
          </li>
        </React.Fragment>
      );
    } else {
      links = (
        <React.Fragment>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <i className="fa fa-sign-in"></i>
              Log In
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              <i className="fa fa-user-plus"></i>
              Register
            </Link>
          </li>
        </React.Fragment>
      );
    }
    return (
      <nav className="navbar navbar-icon-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            InTouch
          </Link>
          <div
            className="navbar-collapse justify-content-between"
            id="navbarSupportedContent"
          >
            <div className="d-flex mobile-container">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fa fa-globe"></i>
                    All Posts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/feed">
                    <i className="fa fa-rss"></i>
                    Feed
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav">{links}</ul>
            </div>
            <a
              href="mailto:morozovaanya020@gmail.com"
              className="report-problem"
            >
              Report a problem
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Header);
