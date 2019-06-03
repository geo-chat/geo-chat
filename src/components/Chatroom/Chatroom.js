import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

class Chatroom extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      message: []
    };
  }
  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    // const socket = io("http://172.31.99.90:7777/chat");
    // const socket = io("http://192.168.254.58:7777/chat");
    const socket = io("http://157.230.212.208:7777/chat");
    socket.on("connected", msg => {
      console.log(msg);
    });
    socket.emit("joinRoom", this.props.match.params.room);
    socket.on("err", err => console.log(err));
    socket.on("success", res => console.log(res));
    socket.on("newUser", res => console.log(res));
    socket.on("msg", res => {
      this.setState({ messages: [...this.state.messages, res.data] });
    });
  };
  sendMessage = () => {
    // const socket = io("http://172.31.99.90:7777/chat");
    // const socket = io("http://192.168.254.58:7777/chat");
    const socket = io("http://157.230.212.208:7777/chat");
    socket.emit("newMsg", {
      room: this.props.match.params.room,
      data: {
        user: this.props.user.username,
        message: this.state.message
      }
    });
    this.setState({ message: "" });
  };

  render() {
    return (
      <div>
        {this.state.messages.map((message, index) => {
          return (
            <div key={index}>
              {message.user}: {message.message}
            </div>
          );
        })}
        <input
          type="text"
          placeholder="Message"
          value={this.state.message}
          onChange={ev => this.setState({ message: ev.target.value })}
        />
        <br />
        <button onClick={this.sendMessage}>Send</button>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    user: reduxState.user
  };
};

export default connect(mapStateToProps)(Chatroom);
