import './App.css';
// Layout
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
// Common 
import Home from './components/Pages/Home/Home';
// Auth
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
// Create
import CreateMenuItem from './components/Form/Create/CreateMenuItem';
// Menu
import BurgerMenu from './components/Menu/Burgers/BurgerMenu';
import DrinksMenu from './components/Menu/Drinks/DrinksMenu';
import FriesMenu from './components/Menu/Fries/FriesMenu';
// Guarded routes
import GuestRoute from './GuardedRoutes/GuestRoute';
import UserRoute from './GuardedRoutes/UserRoute';
import AdminRoute from './GuardedRoutes/AdminRoute';

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

function App() {
	return (
		<AuthProvider>
			<Header />

			<div className='container'>
				<Routes>
					<Route path='/' element={<Home />} />
					{/* User section */}
					<Route element={<UserRoute />}>
						{/* Admin section */}
						<Route element={<AdminRoute />}>
							<Route path='/CreateItem' element={<CreateMenuItem />} />
						</Route>

						<Route path='/Menu/Burgers' element={<BurgerMenu />} />
						<Route path='/Menu/Drinks' element={<DrinksMenu />} />
						<Route path='/Menu/Fries' element={<FriesMenu />} />

					</Route>
					{/* Guest section */}
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
