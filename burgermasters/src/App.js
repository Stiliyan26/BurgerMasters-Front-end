import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Header />

      <div className='container'>
      </div>

      <Footer />
    </Fragment>
  );
}

export default App;
