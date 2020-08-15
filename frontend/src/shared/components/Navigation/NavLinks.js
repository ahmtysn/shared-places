import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "./../../context/auth-context";
import NotificationNavBar from "../Navigation/NotificationNavBar";
import { AiFillHome } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import {
  FaUserCog,
  FaBitbucket,
  FaPlusCircle,
  FaFortAwesome,
  FaNewspaper,
  FaStreetView,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import "./NavLinks.css";

const NavLinks = (props) => {
  const {
    feeds,
    allUsers,
    allPlaces,
    myPlaces,
    friends,
    newPlace,
    myBucketList,
    myAccount,
    signIn,
    signOut,
  } = props;
  const { isLoggedIn, logout, userId } = useContext(AuthContext);

  return (
    <ul className="nav-links">
      {isLoggedIn && (
        <li title="Feeds">
          <NavLink to={`/${userId}/newsfeed`}>
            <FaNewspaper size={27} /> {feeds}
          </NavLink>
        </li>
      )}
      <li title="All Users">
        <NavLink to="/" exact>
          <AiFillHome size={27} /> {allUsers}
        </NavLink>
      </li>
      <li title="All Places">
        <NavLink to="/place/all" exact>
          <FaStreetView size={27} />
          {allPlaces}
        </NavLink>
      </li>
      {isLoggedIn && (
        <li title="My Places">
          <NavLink to={`/${userId}/places`}>
            <FaFortAwesome size={27} />
            {myPlaces}
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li title="Friends">
          <NavLink to={`/${userId}/friends`}>
            <BsFillPeopleFill size={27} />
            {friends}
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li title="New Place">
          <NavLink to="/places/new">
            <FaPlusCircle size={27} />
            {newPlace}
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li title="My Bucket List">
          <NavLink to={`/${userId}/bucketlist`}>
            <FaBitbucket size={27} />
            {myBucketList}
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li title="My Account">
          <NavLink to={`/account/${userId}`}>
            <FaUserCog size={27} />
            {myAccount}
          </NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">
            <FaSignInAlt size={27} /> {signIn}
          </NavLink>
        </li>
      )}

      {isLoggedIn && (
        <li>
          <button onClick={logout}>
            <FaSignOutAlt size={27} />{signOut}
          </button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
