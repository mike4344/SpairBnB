/// frontend/src/components/Footer/index.js
import React from 'react';



function Footer(){

  return (
    <nav className="nav-container">
        <div className='footer'>
            <img src='/Icons/Logo.jpg' height='100%'/>
            <a className='signup-button' href='www.linkedin.com/in/michaelmihalchik' >LinkedIn</a>
            <a className='signup-button' href='https://github.com/mike4344/SpairBnB' >GitHub</a>
            <a className='signup-button' href='https://mikemihalchik.com/' >Code Mike</a>
        </div>
    </nav>
  );
}

export default Footer;
