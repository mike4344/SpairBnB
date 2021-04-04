import React, { useState, useEffect} from 'react';

function Splash (){

    return (
        <div className='splash-container' >
            <div className='banner-box' >
                <div className='banner-image-box'>
                <img className='banner-image' src='/Icons/banner2.gif'/>
                <div className='banner-words'>
                    SpairBnB
                </div>
                </div>
            </div>
            <div className='welcome' >
                <h2>Welcome to SpairBnB </h2>
                <h3> The map based rental App!</h3>
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</p>
            </div>
        </div>
    )
}

export default Splash
