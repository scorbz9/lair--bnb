import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import lairbnbIcon from '../../img/lair--bnb_icon.png'

import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  let hostLink;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );

    hostLink = (
      <NavLink id="host-button" exact to="/host">Become a host</NavLink>

    )

  } else {
    sessionLinks = (
      <>
        <NavLink id="sign-up" className="navlink logged-out" to="/login">Log In</NavLink>
        <NavLink id="log-in" className="navlink logged-out" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul id="navbar">
      <li id="left-navbar-container">
        <NavLink exact to="/">
          <div id="logo-container">
            <img id="logo-icon" src={lairbnbIcon}></img>
            <div id="logo-text">
              Lairbnb
            </div>
          </div>
        </NavLink>
      </li>
      <li id="right-navbar-container">
        {hostLink}
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
