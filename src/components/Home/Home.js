import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';

class Home extends Component {
	render() {
		return (
			<div>
				<h1>
					<Navbar />
				</h1>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {};
}
export default connect(mapStateToProps)(Home);
