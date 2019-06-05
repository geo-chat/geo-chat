import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import '../Chatroom/Chatroom.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { addToRoom, leaveRoom, getRooms } from '../../store';
import { Link } from 'react-router-dom';

class Chatroom extends Component {
	constructor() {
		super();
		this.state = {
			messages: [],
			message: [],
			index: -1
		};
	}
	componentDidMount() {
		this.initSocket();
		let index;
		for (let i = 0; i < this.props.rooms.length; i++) {
			if (this.props.rooms[i].name === this.props.match.params.room) {
				index = i;
			}
		}
		let chatid = this.props.rooms[index].id;
		this.setState({ index });
		const { lat, lng } = this.props;
		this.props.addToRoom(chatid, lat, lng);
	}
	componentWillUnmount() {
		const socket = io('http://172.31.99.90:7777/chat', { secure: true });
		socket.emit('leave', this.props.match.params.room);
		let index;
		for (let i = 0; i < this.props.rooms.length; i++) {
			if (this.props.rooms[i].name === this.props.match.params.room) {
				index = i;
			}
		}
		let chatid = this.props.rooms[index].id;
		const { lat, lng } = this.props;
		this.props.leaveRoom(chatid, lat, lng);
	}

	initSocket = () => {
		const socket = io('http://172.31.99.178:7777/chat', { secure: true });
		// const socket = io("http://192.168.254.58:7777/chat");
		// const socket = io("http://192.241.133.39:7777/chat", { secure: true });
		socket.on('connected', (msg) => {
			console.log(msg);
		});
		socket.emit('joinRoom', this.props.match.params.room);
		socket.on('err', (err) => console.log(err));
		socket.on('success', (res) => console.log(res));
		socket.on('newUser', (res) => {
			this.props.getRooms(this.props.lat, this.props.lng);
			toast.success(res);
		});
		socket.on('left', (res) => {
			this.props.getRooms(this.props.lat, this.props.lng);
			toast.warning(res);
		});
		socket.on('msg', (res) => {
			this.setState({ messages: [ ...this.state.messages, res.data ] });
		});
	};
	sendMessage = () => {
		const socket = io('http://172.31.99.178:7777/chat', { secure: true });
		// const socket = io("http://192.168.254.58:7777/chat");
		// const socket = io("http://192.241.133.39:7777/chat", { secure: true });
		socket.emit('newMsg', {
			room: this.props.match.params.room,
			data: {
				user: this.props.user.username,
				message: this.state.message
			}
		});
		this.setState({ message: '' });
	};

	render() {
		return (
			<div>
				<div className="addingFormSide">
					<div className="peopleInChat">
						<nav className="navbar navbar-expand-lg navbar-light bg-custom navbarInsidePeople ">
							<Link className="navbar-brand menuForChatRoom" to="/">
								<i class="fas fa-arrow-left" />
							</Link>
							<h3 className="chatRoomNav">Geo-Chat</h3>
						</nav>
						<div className="borderBoxChatRoom">
							<img
								className="imageInSideChat"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHsq42gI4nJHpUBrVwfQZ8wVi6hrc_hIvkffMRVkdioqqmgySv_Q"
							/>
							<h3>Carlos</h3>
						</div>
						<div className="borderBoxChatRoom">
							<img
								className="imageInSideChat"
								src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
							/>
							<h3>Trevor</h3>
						</div>
						<div className="borderBoxChatRoom">
							<img
								className="imageInSideChat"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkpsJ1BBquBgmlDfhk6ZAzHLC-1JBZv5wGguUhL59arbW5Qp1LWg"
							/>
							<h3>Anna</h3>
						</div>
					</div>
					<div className="chatRoomForm">
						{/* <div className="msgForm"> */}
						{/* {this.state.index !== -1 ? <h2>{this.props.rooms[this.state.index].member}</h2> : null} */}
						<ToastContainer />
						<div className="scrollMsg">
							{this.state.messages.map((message, index) => {
								return (
									<div className="messages" key={index}>
										<p className="userMessage">
											{message.user}: {message.message}
										</p>
									</div>
								);
							})}
							{/* </div> */}
						</div>
						<div className="input-Btn">
							<div className="wholeInput">
								<input
									className="inputMessage"
									type="text"
									placeholder="Type a Message"
									value={this.state.message}
									onChange={(ev) => this.setState({ message: ev.target.value })}
								/>
							</div>
							<div className="wholeSend">
								<i onClick={this.sendMessage} class="far fa-paper-plane" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (reduxState) => {
	return {
		user: reduxState.user,
		rooms: reduxState.rooms,
		lat: reduxState.lat,
		lng: reduxState.lng
	};
};

export default connect(mapStateToProps, { addToRoom, leaveRoom, getRooms })(Chatroom);
