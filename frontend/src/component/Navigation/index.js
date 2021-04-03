/// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignUpModal from '../SignUpModal';
import SpotCreationModal from '../SpotCreationModal'
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
        <SignUpModal />
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
          <NavLink to='/spots/search'>
            <img className='search' src='/Icons/icons8-search-32.png' alt='Search' />
          </NavLink>
          {isLoaded && sessionLinks}
          </div>
        </div>

    </nav>
  );
}

export default Navigation;
