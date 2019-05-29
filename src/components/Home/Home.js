<<<<<<< HEAD
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
=======
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';
import Navbar from '../Navbar/Navbar';

class Home extends Component {
	componentDidMount() {
		Axios.get('/api/auth/getuser').catch((err) => err);
	}
	render() {
		return (
			<div>
				<Navbar />
			</div>
		);
	}
>>>>>>> master
}

function mapStateToProps(state) {
  return {};
}
export default connect(mapStateToProps)(Home);
