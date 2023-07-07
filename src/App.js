import './App.css';

import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Home from './components/Pages/Home/Home';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import Logout from './components/Authentication/Logout/Logout';

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import GuestRoute from './GuardedRoutes/GuestRoute';
import UserRoute from './GuardedRoutes/UserRoute';

function App() {
	return (
		<AuthProvider>
			<Header />

			<div className='container'>
				<Routes>
					<Route path='/' element={<Home />} />

					<Route element={<UserRoute />}>
						<Route path='/Logout' element={<Logout />} />
					</Route>

					<Route element={<GuestRoute />}>
						<Route path='/Login' element={<Login />} />
						<Route path='/Register' element={<Register />} />
					</Route>

				</Routes>
			</div>

			<Footer />
		</AuthProvider>
	);
}

export default App;
