import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import Chatroom from './components/Chatroom/Chatroom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

function App() {
	return (
		<Provider store={store}>
			<HashRouter>{routes}</HashRouter>
		</Provider>
	);
}

export default App;
