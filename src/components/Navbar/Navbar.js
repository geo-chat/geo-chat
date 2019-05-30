import React, { Component } from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store";

class Navbar extends Component {
  handleLogout = () => {
    this.props.logout();
  };
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
          <Link to="/">Logo</Link>
          <h4>Geo-Chat</h4>
          <ul className="nav nav-pills">
            <li className="nav-item dropdown">
              <a
                // class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="far fa-caret-square-down" />
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <Link to="/login" className="dropdown-item">
                  Signup/Login
                </Link>
                <a className="dropdown-item" href="#">
                  <button>Create Chat-Room</button>
                </a>
                <a className="dropdown-item" href="#">
                  <button className="logoutBtn" onClick={this.handleLogout}>
                    Logout
                  </button>
                </a>
              </div>
            </li>
          </ul>
          <Link to="/setting">
            <i className="fas fa-cog" />
          </Link>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <Link to="/login">
                <li className="nav-item">Signup/Login</li>
              </Link>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Contacts
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <form className="form-inline">
          <input
            className="searchInput form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-custom my-2 my-sm-0" type="submit">
            <i className="fas fa-search" />
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = reduxState => reduxState;

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
