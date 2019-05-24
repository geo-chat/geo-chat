import React, { Component } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

class Home extends Component {
	componentDidMount() {
		Axios.get('/api/auth/getuser').catch((err) => err);
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
