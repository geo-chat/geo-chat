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
          console.log(res);
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
              src="https://banner2.kisspng.com/20180424/oaq/kisspng-honda-logo-car-2007-honda-cr-v-decorative-stickers-5adfa878c61c14.8927719915246070968115.jpg"
              className=" topnavBarImage d-inline-block align-center"
              alt=""
            />
            <h3 className="geoChat"> Geo-Chat</h3>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  <i className="fas fa-home" />
                  <span className="sr-only">(current)</span>
                </Link>
              </li>

              <li className="nav-item ">
                <Link
                  to="/create"
                  className="nav-link"
                  id="create_button"
                  // type="button"
                  // class="btn btn-custom"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <i className="fas fa-plus" />
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
                      {/* <label className="chatRoomName">Chatroom Name:</label> */}
                      <input
                        className="popUpInput"
                        onChange={this.changeHandler}
                        placeholder="Enter Name"
                        id="create_input"
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>

                      <li className="nav-item ">
                        <Link
                          to="/create"
                          id="create_room_button"
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
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  id="dropdown_menu"
                >
                  <i className="far fa-caret-square-down" />
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {this.props.user.username === "A Lurker" ? (
                    <Link
                      className="dropdown-item"
                      to="/login"
                      id="login_button"
                    >
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
