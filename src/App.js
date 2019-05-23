import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';

function App() {
	return (
		<HashRouter>
			<div className="App">
				<NavBar />
			</div>
		</HashRouter>
	);
}

export default App;
