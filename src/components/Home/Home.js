import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Home extends Component {
  componentDidMount() {
    axios.get("/api/auth/getuser").catch(err => err);
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords);
    });
  }
  render() {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Home);
