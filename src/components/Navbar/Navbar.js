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
      lat: null,
      lng: null,
      chatName: "",
      rooms: []
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  changeHandler = e => {
    this.setState({ chatName: e.target.value });
  };
  handleLogout = () => {
    this.props.logout();
  };
  async clickHandler() {
    console.log(this.props);
    if (this.state.name === "") {
      alert("Please enter a name for your chatroom");
    } else {
      await axios
        .post("/api/chat/create", {
          name: this.state.chatName,
          lat: this.props.lat,
          lng: this.props.lng
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
            Geo-Chat
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
                  <i className="fas fa-home" /> Home{" "}
                  <span className="sr-only">(current)</span>
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
                >
                  <i className="far fa-caret-square-down" /> Login/Signup
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {!this.props.user.username ? (
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
              <li className="nav-item ">
                <Link
                  to="/create"
                  className="nav-link"
                  // type="button"
                  // class="btn btn-custom"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  <i class="fas fa-plus" /> Add Chatroom
                </Link>
              </li>
              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">
                        Create Chatroom
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      {/* <label className="chatRoomName">Chatroom Name:</label> */}
                      <input
                        className="popUpInput"
                        onChange={this.changeHandler}
                        placeholder="Enter Name"
                      />
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <li className="nav-item ">
                        <Link to="/create" className="nav-link addBtnInPopUp">
                          Add Chatroom
                        </Link>
                      </li>
                    </div>
                  </div>
                </div>
              </div>

              <li className="nav-item ">
                <Link className="nav-link" to="/setting">
                  <i className="fas fa-cog" /> Settings
                </Link>
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
