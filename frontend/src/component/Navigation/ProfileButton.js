// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import SpotCreationModal from "../SpotCreationModal"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

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
  };

  return (
    <>
    <SpotCreationModal />
    <div className='nav-button_box_logged-in'>

      <button className='nav-button_menu' onClick={openMenu}>
        <img className='nav-button_menu-image' src='/Icons/icons8-menu-24.png' alt='open menu'/>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button className='logout-button' onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
    </>
  );
}

export default ProfileButton;
