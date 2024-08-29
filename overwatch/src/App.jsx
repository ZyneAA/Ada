import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import User from "./components/User"
import Home from './components/Home';

const Dashboard = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={ <Home/>}/>
				<Route path="/user/:user_id" element={<User />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>

	);
};

export default Dashboard;
