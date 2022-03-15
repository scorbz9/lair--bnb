import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink, useHistory } from "react-router-dom"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());

    history.push('/')
  };

  return (
    <div className="profile-dropdown-container">
      <button id="user-button" onClick={openMenu}>
        <i className="fas fa-bars user-button-icon" id="user-button-bars"/>
        <i className="fas fa-user user-button-icon" />
      </button>
      {showMenu && (
          <div className="profile-dropdown-content">
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>
              <NavLink id="view-your-spots-button" className="profile-dropdown-button" exact to="/spots">View your spots</NavLink>
            </div>

              <button onClick={logout} className="profile-dropdown-button" id="profile-dropdown-logout">Log Out</button>

          </div>
      )}
    </div>
  );
}

export default ProfileButton;
