import React, { Component } from "react";
import { connect } from "react-redux";
import "../Chatroom/Chatroom.css";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { addToRoom, leaveRoom, getRooms, getUser } from "../../store";
import axios from "axios";

class Chatroom extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      message: "",
      socket: null,
      users: []
    };
  }
  async componentDidMount() {
    window.addEventListener("beforeunload", this.componentCleanup);
    const socket = io.connect("https://192.168.254.58:7777/chat", {
      secure: true
    });
    // const socket = io.connect("https://localhost", { secure: true });
    this.setState({ socket });
    await this.props.getUser();
    this.initSocket();
    const { lat, lng } = this.props;
    const chatid = this.props.match.params.chatid;
    this.props.addToRoom(chatid, lat, lng);
  }
  componentCleanup = () => {
    const { socket } = this.state;
    socket.emit("leave", {
      room: this.props.match.params.room,
      username: this.props.user.username
    });
    const { lat, lng } = this.props;
    const chatid = this.props.match.params.chatid;
    this.props.leaveRoom(chatid, lat, lng);
  };
  componentWillUnmount() {
    this.componentCleanup();
    window.removeEventListener("beforeunload", this.componentCleanup);
  }

  initSocket = () => {
    const { socket } = this.state;
    socket.on("connected", msg => {
      console.log(msg);
    });
    socket.emit("joinRoom", {
      room: this.props.match.params.room,
      username: this.props.user.username
    });

    socket.on("err", err => console.log(err));
    socket.on("success", res => console.log(res));
    socket.on("newUser", res => {
      this.props.getRooms(this.props.lat, this.props.lng);
      axios
        .get(`/api/chat/getUsernames/${this.props.match.params.chatid}`)
        .then(response => {
          this.setState({ users: response.data });
        })
        .catch(err => console.log(err));
      toast.success(res);
    });
    socket.on("left", res => {
      this.props.getRooms(this.props.lat, this.props.lng);
      axios
        .get(`/api/chat/getUsernames/${this.props.match.params.chatid}`)
        .then(response => {
          this.setState({ users: response.data });
        })
        .catch(err => console.log(err));
      toast.warning(res);
    });
    socket.on("msg", res => {
      let { messages } = this.state;
      messages.unshift(res.data);
      this.setState({ messages });
    });
  };
  sendMessage = () => {
    const { socket } = this.state;
    if (this.state.message !== "") {
      const { username, hexcolor } = this.props.user;
      socket.emit("newMsg", {
        room: this.props.match.params.room,
        data: {
          user: username,
          message: this.state.message,
          color: hexcolor
        }
      });
      this.setState({ message: "" });
    }
  };
  keyPressed = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  render() {
    return (
      <div>
        <div className="addingFormSide">
          <div className="peopleInChat">
            <nav className="navbar navbar-expand-lg navbar-light bg-custom navbarInsidePeople ">
              <Link className="navbar-brand menuForChatRoom" to="/">
                <i className="fas fa-arrow-left" />
              </Link>
              <h3 className="chatRoomNav">Geo-Chat</h3>
            </nav>
            {this.state.users.map((user, index) => {
              return (
                <div className="borderBoxChatRoom" key={index}>
                  {user.img !== "" ? (
                    <img
                      className="imageInSideChat"
                      alt="user img"
                      src={user.img}
                    />
                  ) : (
                    <img
                      className="imageInSideChat"
                      alt="user img"
                      src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    />
                  )}
                  <h3 className="personName">{user.username}</h3>
                </div>
              );
            })}
          </div>
          <div className="chatRoomForm">
            <ToastContainer />
            <div className="scrollMsg">
              {this.state.messages.map((message, index) => {
                return (
                  <div className="messages" key={index}>
                    <div
                      className="userMessage"
                      style={{ color: message.color }}
                    >
                      <p>{message.user}: </p>{" "}
                      <p className="userMsg"> {message.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            {this.props.user.username === "A Lurker" ? (
              <div className="inputMessage">Please Login To Chat</div>
            ) : (
              <div className="input-Btn">
                <div className="wholeInput">
                  <input
                    onKeyPress={this.keyPressed}
                    className="inputMessage"
                    type="text"
                    placeholder="Type a Message"
                    value={this.state.message}
                    onChange={ev => this.setState({ message: ev.target.value })}
                  />
                </div>
                <div className="wholeSend">
                  <button
                    className="btnOutSidePaperPlane"
                    type="submit"
                    onClick={this.sendMessage}
                  >
                    <i className="far fa-paper-plane" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    user: reduxState.user,
    rooms: reduxState.rooms,
    lat: reduxState.lat,
    lng: reduxState.lng
  };
};

export default connect(
  mapStateToProps,
  { addToRoom, leaveRoom, getRooms, getUser }
)(Chatroom);
