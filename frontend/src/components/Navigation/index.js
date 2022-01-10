import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
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
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
