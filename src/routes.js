import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Setting from './components/Setting/Settings';

export default (
	<Switch>
		<Route path="/setting" component={Setting} />
		<Route path="/signup" component={SignUp} />
		<Route path="/login" component={Login} />
		<Route path="/" component={Home} />
	</Switch>
);
