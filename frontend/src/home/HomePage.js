import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './HomePage.css';

import MainHeader from '../shared/components/Navigation/MainHeader';
import Banner from './components/Banner';
import Features from './components/Features';
import Gallery from './components/Gallery';
import AuthPage from '../users/pages/AuthPage';

const HomePage = () => {
  let x = 0;
  let y = document.height;
  window.scroll(x, y);
  return (
    <Fragment>
      <Banner />
      <div className='home-auth-card '>
        <AuthPage />
      </div>
      <Features />
      <Gallery />
    </Fragment>
  );
};

export default HomePage;
