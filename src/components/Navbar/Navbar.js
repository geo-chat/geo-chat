import React, { Component } from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store";
import axios from "axios";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      chatName: ""
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  changeHandler = e => {
    this.setState({ chatName: e.target.value });
  };
  handleLogout = () => {
    this.props.logout();
  };
  clickHandler() {
    console.log(this.props);
    if (this.state.name === "") {
      alert("Please enter a name for your chatroom");
    } else if (this.props.user.id === 0) {
      alert("Please Login");
    } else {
      axios
        .post("/api/chat/create", {
          name: this.state.chatName,
          lat: this.props.lat,
          lng: this.props.lng
        })
        .then(res => {
          this.props.renderRooms();
        })
        .catch(err => console.log(err));
      this.setState({ chatName: "" });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
          <Link className="navbar-brand" to="/">
            <img
              src="https://freepngimg.com/download/map/66970-map-google-icons-house-maps-computer-marker.png"
              className=" topnavBarImage d-inline-block align-center"
              alt=""
            />
            <h3 className="geoChat"> Geo-Chat</h3>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="nav navbar-nav ml-auto navbarTargetName">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  <i className="fas fa-home" />
                  Home
                  <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li className="nav-item ">
                <Link
                  to="/create"
                  className="nav-link"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <i className="fas fa-plus" /> Add Chatroom
                </Link>
              </li>
              <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalCenterTitle">
                        Create Chatroom
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <input
                        className="popUpInput"
                        onChange={this.changeHandler}
                        placeholder="Enter Name"
                        value={this.state.chatName}
                      />
                    </div>
                    <div className="modal-body">
                      <li className="nav-item ">
                        <Link
                          to="/create"
                          className="nav-link addBtnInPopUp"
                          onClick={this.clickHandler}
                          data-dismiss="modal"
                        >
                          Add Chatroom
                        </Link>
                      </li>
                    </div>
                  </div>
                </div>
              </div>

              <li className="nav-item ">
                <Link className="nav-link" to="/setting">
                  <i className="fas fa-cog" />
                  Settings
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link "
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="far fa-caret-square-down" /> Login/SignUp
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {this.props.user.username === "A Lurker" ? (
                    <Link className="dropdown-item" to="/login">
                      <h6> Login </h6>
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="dropdown-item"
                      onClick={this.props.logout}
                    >
                      <h6> Log out </h6>
                    </Link>
                  )}

                  <Link to="/signup" className="dropdown-item">
                    Sign up
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    lat: reduxState.lat,
    lng: reduxState.lng
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
