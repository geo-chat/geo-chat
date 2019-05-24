import React from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import Home from './components/Home/Home';

function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<div className="App">{routes}</div>
			</HashRouter>
		</Provider>
	);
}

export default App;
