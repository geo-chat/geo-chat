import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import { connect } from "react-redux";
import axios from "axios";
import { getCoords, getRooms } from "./store";

class App extends React.Component {
  async componentDidMount() {
    axios.get("/api/auth/getuser").catch(err => err);
    await this.props.getCoords();
    this.props.getRooms(this.props.lat, this.props.lng);
  }
  render() {
    return <HashRouter>{routes}</HashRouter>;
  }
}
function mapStateToProps(state) {
  return state;
}

export default connect(
  mapStateToProps,
  { getCoords, getRooms }
)(App);
