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
}

function mapStateToProps(state) {
	return {};
}
export default connect(mapStateToProps)(Home);
