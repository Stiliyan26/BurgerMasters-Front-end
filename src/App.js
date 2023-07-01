import './App.css';
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import Home from './components/Pages/Home/Home';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';

import { Route, Routes } from "react-router-dom";
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Header />

      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
        </Routes>
      </div>

      <Footer />
    </Fragment>
  );
}

export default App;
