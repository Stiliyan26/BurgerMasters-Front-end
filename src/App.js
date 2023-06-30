import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home'

import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Header />

      <div className='container'>
        <Home />
      </div>

      <Footer />
    </Fragment>
  );
}

export default App;
