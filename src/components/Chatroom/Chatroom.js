import React, { Component } from "react";
import { connect } from "react-redux";
import "../Chatroom/Chatroom.css";
import io from "socket.io-client";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect, Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { addToRoom, leaveRoom, getRooms } from "../../store";

class Chatroom extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      message: "",
      socket: null
    };
  }
  async componentDidMount() {
    window.addEventListener("beforeunload", this.componentCleanup);
    const socket = io("http://172.31.99.90:7777/chat", { secure: true });
    // const socket = io("http://192.168.254.58:7777/chat");
    // const socket = io("http://192.241.133.39:7777/chat", { secure: true });
    await this.setState({ socket });
    this.initSocket();
    const { lat, lng } = this.props;
    const chatid = this.props.match.params.chatid;
    this.props.addToRoom(chatid, lat, lng);
  }
  componentCleanup = () => {
    const { socket } = this.state;
    if (this.props.user.username) {
      socket.emit("leave", {
        room: this.props.match.params.room,
        username: this.props.user.username
      });
    } else {
      socket.emit("leave", {
        room: this.props.match.params.room,
        username: "A Lurker"
      });
    }
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
    if (this.props.user.username) {
      socket.emit("joinRoom", {
        room: this.props.match.params.room,
        username: this.props.user.username
      });
    } else {
      socket.emit("joinRoom", {
        room: this.props.match.params.room,
        username: "A Lurker"
      });
    }
    socket.on("err", err => console.log(err));
    socket.on("success", res => console.log(res));
    socket.on("newUser", res => {
      this.props.getRooms(this.props.lat, this.props.lng);
      toast.success(res);
    });
    socket.on("left", res => {
      this.props.getRooms(this.props.lat, this.props.lng);
      toast.warning(res);
    });
    socket.on("msg", res => {
      this.setState({ messages: [...this.state.messages, res.data] });
    });
  };
  sendMessage = () => {
    const { socket } = this.state;
    if (this.state.message !== "") {
      socket.emit("newMsg", {
        room: this.props.match.params.room,
        data: {
          user: this.props.user.username,
          message: this.state.message,
          color: this.props.user.hexcolor
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
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
          <Link className="navbar-brand menuForChatRoom" to="/">
            <i className="fas fa-less-than" /> MENU
          </Link>
        </nav>
        <div className="addingFormSide">
          <div className="peopleInChat">
            <p>Hello</p>
          </div>
          <div className="chatRoomForm">
            {/* <div className="msgForm"> */}
            {/* {this.state.index !== -1 ? <h2>{this.props.rooms[this.state.index].member}</h2> : null} */}
            <ToastContainer />
            <div className="scrollMsg">
              {this.state.messages.map((message, index) => {
                return (
                  <div className="messages" key={index}>
                    <p className="userMessage" style={{ color: message.color }}>
                      {message.user}: {message.message}
                    </p>
                  </div>
                );
              })}
              {/* </div> */}
            </div>
            {this.props.user.username ? (
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
                  <i
                    type="submit"
                    onClick={this.sendMessage}
                    className="far fa-paper-plane"
                  />
                </div>
              </div>
            ) : (
              <div className="inputMessage">Please Login To Chat</div>
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
  { addToRoom, leaveRoom, getRooms }
)(Chatroom);
