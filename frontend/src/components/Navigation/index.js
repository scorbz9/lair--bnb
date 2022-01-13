import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  let mySpotsLink;

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );

    mySpotsLink = (
      <NavLink id="spots-link" className="navlink logged-in" exact to="/spots">My Spots</NavLink>
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
      <li>
        <NavLink className="navlink" exact to="/">Home</NavLink>
        {mySpotsLink}
      </li>
      <li>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
