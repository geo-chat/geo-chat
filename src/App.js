import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import routes from './routes';
import { Provider } from 'react-redux';

function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<div className="App">
					<Navbar />
					{routes}
				</div>
			</HashRouter>
		</Provider>
	);
}

export default App;
