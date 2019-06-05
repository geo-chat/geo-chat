import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { getCoords, getRooms } from '../../store';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	async componentDidMount() {
		axios.get('/api/auth/getuser').catch((err) => err);
		await this.props.getCoords();
		this.props.getRooms(this.props.lat, this.props.lng);
	}
	deleteRoom = (chatid) => {
		console.log('anna');
		axios.delete(`/api/chat/deleteroom/${chatid}`).catch((err) => err);
		this.props.getRooms(this.props.lat, this.props.lng);
	};

	render() {
		return (
			<div>
				<Navbar />
				{/* CHAT-ROOM PRODUCT CARD */}
				<section className="menuIntro">
					<div className="jumbotron">
						<h1 className="display-4">Chat Room</h1>
						<p className="lead">
							This is a simple hero unit, a simple jumbotron-style component for calling extra attention
							to featured content or information.
						</p>
						{/* SEARCH BAR */}
						<form className="navbar-form " role="search">
							<div className="input-group">
								<input type="search" className="form-control" placeholder="Search" />
								<button type="submit" class="btn btn-outline-custom">
									<i className="fas fa-search" />
								</button>
							</div>
						</form>

						{/* 
						<a href="#about" class="scroll-icon smoothscroll">
							<i class="fas fa-angle-down" aria-hidden="true" />
						</a> */}
					</div>
				</section>

				<main className="chatRooms">
					{this.props.rooms !== [] ? (
						this.props.rooms.map((room, index) => (
							<div key={index} class="card">
								<div className="card-body">
									<h5 className="card-title">{room.name}</h5>
									<p className="card-text">
										Some quick example text to build on the card title and make up the bulk of the
										card's content.
									</p>
									<Link to={`/chatroom/${room.name}`} class="card-link">
										Enter Chat Room
									</Link>
									{room.userid === this.props.user.id ? (
										<button onClick={() => this.deleteRoom(room.id)}>Delete</button>
									) : null}
								</div>
							</div>
						))
					) : (
						<h3>No Rooms Available</h3>
					)}
				</main>
			</div>
		);
	}
}

function mapStateToProps(state) {
	console.log(state);
	return {
		lat: state.lat,
		lng: state.lng,
		rooms: state.rooms,
		user: state.user
	};
}
export default connect(mapStateToProps, { getCoords, getRooms })(Home);
