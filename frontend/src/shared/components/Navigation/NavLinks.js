import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from './../../context/auth-context';
import { AiFillHome } from 'react-icons/ai';
import { BiLocationPlus } from 'react-icons/bi';
import { GiBrokenHeartZone } from 'react-icons/gi';

import { BsFillPeopleFill, BsNewspaper } from 'react-icons/bs';
import {
  FaUserCog,
  FaMapMarkedAlt,
  FaStreetView,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';

import './NavLinks.css';

const NavLinks = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  return (
    <ul className='nav-links'>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/newsfeed`}>
            <BsNewspaper size={27} />
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to='/' exact>
          <AiFillHome size={27} />
        </NavLink>
      </li>
      <li>
        <NavLink to='/place/all' exact>
          <FaStreetView size={27} />
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`}>
            <FaMapMarkedAlt size={27} />
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/friends`}>
            <BsFillPeopleFill size={27} />
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to='/places/new'>
            <BiLocationPlus size={27} />
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/bucketlist`}>
            <GiBrokenHeartZone size={27} />
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to={`/account/${userId}`}>
            <FaUserCog size={27} />
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to='/auth'>
            <FaSignInAlt size={27} />
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li>
          <button onClick={logout}>
            <FaSignOutAlt size={27} />
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
