import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import routes from "./routes";
import { connect } from "react-redux";
import axios from "axios";
import { getCoords, getRooms } from "./store";

class App extends React.Component {
  componentDidMount() {
    axios.get("/api/auth/getuser").catch(err => err);
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
