import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "./../../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          All Users
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={`/${userId}/places`}>My Places</NavLink>
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
