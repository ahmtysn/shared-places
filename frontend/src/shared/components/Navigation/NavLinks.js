import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "./../../context/auth-context";
import NotificationNavBar from "../Navigation/NotificationNavBar";
import { AiFillHome } from 'react-icons/ai'
import { BsFillPeopleFill } from "react-icons/bs";
import "./NavLinks.css";

const NavLinks = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  return (
    <ul className="nav-links">
    {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/newsfeed`}>
            <AiFillHome size={27}/>
          </NavLink>
        </li>
      )}
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/place/all" exact>
          All Places
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`}>My Places</NavLink>
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
          <NavLink to="/places/new">Add New Place</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/bucketlist`}>Bucket List</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to={`/account/${userId}`}>My Account</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Authentication</NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
