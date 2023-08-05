import './App.css';
// Layout
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
// Common 
import Home from './components/Pages/Home/Home';
import ErrorPage from './components/Pages/ErrorPage/ErrorPage';
import InternalServerError from './components/Pages/InternalServerErrorPage.js/InternalServerErrorPage';
// Auth
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
// Admin
import CreateMenuItem from './components/Admin/Create/CreateMenuItem';
import EditMenuItem from './components/Admin/Edit/EditMenuItem'
import PendingOrders from './components/Admin/Orders/PendingOrders/PendingOrders';
import OrderDetails from './components/Admin/Orders/OrderDetails/OrderDetails';
import OrderHistory from './components/Admin/Orders/OrderHistory/OrderHistory';
//User and Admin
import MyOrders from './components/Admin/Orders/MyOrders/MyOrders';
//Admin posts
import MyBurgerPosts from './components/Admin/MyPosts/MyBurgersPosts/MyBurgerPosts'
import MyDrinkPosts from './components/Admin/MyPosts/MyDrinkPosts/MyDrinkPosts';
import MyFriesPosts from './components/Admin/MyPosts/MyFriesPosts/MyFriesPosts';
import MyGrillPosts from './components/Admin/MyPosts/MyGrillPosts/MyGrillPosts';
import MyHotdogPosts from './components/Admin/MyPosts/MyHotdogPosts/MyHotdogPosts';
import MySaladPosts from './components/Admin/MyPosts/MySaladPosts/MySaladPosts';
import MySandwichPosts from './components/Admin/MyPosts/MySandwichPosts/MySandwichPosts';
// Menu
import BurgerMenu from './components/Menu/BurgerMenu/BurgerMenu';
import SandwichMenu from './components/Menu/SandwichMenu/SandwichMenu';
import FriesMenu from './components/Menu/FriesMenu/FriesMenu';
import DrinkMenu from './components/Menu/DrinkMenu/DrinkMenu';
import HotdogMenu from './components/Menu/HotdogMenu/HotdogMenu';
import GrillMenu from './components/Menu/GrillMenu/GrillMenu';
import SaladMenu from './components/Menu/SaladMenu/SaladMenu';
//Details
import ItemDetails from './components/Details/ItemDetails/ItemDetails';
//Cart
import Cart from './components/Cart/Cart';
// Guarded routes
import GuestRoute from './GuardedRoutes/GuestRoute';
import UserRoute from './GuardedRoutes/UserRoute';
import AdminRoute from './GuardedRoutes/AdminRoute';

import Review from './components/Review/Review/Review';

import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

function App() {
	return (
		<AuthProvider>
			<Header />

			<div className='container'>
				<Routes>
					{/* Common */}
					<Route path='/' element={<Home />} />
					<Route path="/*" element={<ErrorPage />} />
					<Route path="/Not-found" element={<ErrorPage />} />

					<Route path="/Internal-server-error" element={<InternalServerError />} />

					{/* User section */}
					<Route element={<UserRoute />}>
						{/* Admin section */}
						<Route element={<AdminRoute />}>
							<Route path='/CreateItem' element={<CreateMenuItem />} />
							<Route path='/EditItem/:itemId' element={<EditMenuItem />} />
							<Route path='/Orders' element={<PendingOrders />} />
							<Route path='/OrderHistory' element={<OrderHistory />} />

							<Route path='/MyPosts/Burgers' element={<MyBurgerPosts />} />
							<Route path='/MyPosts/Drinks' element={<MyDrinkPosts />} />
							<Route path='/MyPosts/Fries' element={<MyFriesPosts />} />
							<Route path='/MyPosts/Hotdogs' element={<MyHotdogPosts />} />
							<Route path='/MyPosts/Grills' element={<MyGrillPosts />} />
							<Route path='/MyPosts/Salads' element={<MySaladPosts />} />
							<Route path='/MyPosts/Sandwiches' element={<MySandwichPosts />} />
						</Route>

						<Route path='/Menu/Burgers' element={<BurgerMenu />} />
						<Route path='/Menu/Drinks' element={<DrinkMenu />} />
						<Route path='/Menu/Fries' element={<FriesMenu />} />
						<Route path='/Menu/Hotdogs' element={<HotdogMenu />} />
						<Route path='/Menu/Grills' element={<GrillMenu />} />
						<Route path='/Menu/Salads' element={<SaladMenu />} />
						<Route path='/Menu/Sandwiches' element={<SandwichMenu />} />

						<Route path='/Details/:itemId' element={<ItemDetails />} />
						<Route path='/Cart' element={<Cart />} />

						<Route path='/MyOrders' element={<MyOrders />} />
						<Route path='/OrderDetails/:orderId' element={<OrderDetails />} />

						<Route path='/Review' element={<Review />} />
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
