import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Navbar from "../Navbar/Navbar";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: null,
      lng: null,
      chatName: "",
      rooms: []
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  async componentDidMount() {
    axios.get("/api/auth/getuser").catch(err => err);
    await navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
    let results = await axios.post("/api/chat/getrooms");
    this.setState({
      rooms: results.data
    });
  }
  changeHandler = e => {
    this.setState({ chatName: e.target.value });
  };
  async clickHandler() {
    console.log(this.state);
    await axios
      .post("/api/chat/create", {
        name: this.state.chatName,
        lat: this.state.lat,
        lng: this.state.lng
      })
      .catch(err => console.log(err));
    this.setState({ chatName: "" });
  }
  render() {
    console.log(this.state);
    return (
      <div>
        <Navbar />
        <input onChange={this.changeHandler} />
        <button onClick={this.clickHandler}>Add ChatRoom</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Home);
