import React, { Component } from "react";
import { connect } from "react-redux";

class Settings extends Component {
  render() {
    return (
      <div>
        <h1>Settings</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Settings);
