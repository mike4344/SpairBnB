/// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
      <ProfileButton user={sessionUser} />
      <img className='user-image' src={sessionUser.imageUrl} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink  to="/signup"><button className="signup-button">Sign Up</button></NavLink>
      </>
    );
  }

  return (
    <nav className="nav-container">

        <div className='nav'>
          <NavLink className='nav-bar_home-link' exact to="/">
            <img onMouseEnter={e => e.target.src = '/Icons/icons8-home.gif' }
              onMouseLeave={e => e.target.src = '/Icons/icons8-home.svg' }
              id='home-logo' src='/Icons/icons8-home.svg' alt='Home'/>
          </NavLink>
          <div className='nav-button_box'>
          {isLoaded && sessionLinks}
          </div>
        </div>

    </nav>
  );
}

export default Navigation;
