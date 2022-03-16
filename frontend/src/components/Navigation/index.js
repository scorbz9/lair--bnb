import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

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
        <NavLink id="log-in" to="/login">Log In</NavLink>
        <NavLink id="sign-up" to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul id="navbar">
      <li id="left-navbar-container">
        <NavLink exact to="/">
          <div id="logo-container">
            <i className="fas fa-hotel" id="logo-icon"></i>
            <div id="logo-text">
            <span style={{"color": "black"}}>Lair</span>bnb
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
