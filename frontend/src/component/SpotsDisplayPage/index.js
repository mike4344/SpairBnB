// frontend/src/components/SpotsDisplayPage/index.js
import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import * as SpotActions from '../../store/spots'
import ImageCarousel from '../ImageCarousel'
function SpotsDisplayPage () {
    const dispatch = useDispatch();
    const {spotId} = useParams()
    const [spotIsLoaded, setSpotIsLoaded] = useState(false);
    useEffect(() => {
      dispatch(SpotActions.getSpot(spotId)).then(() => setSpotIsLoaded(true));
    }, [dispatch]);
    const spot = useSelector(state=> state.spot.spot)

    return (
        <div className="page-container">
            {spotIsLoaded && (
            <div className="spot-container">
                <ImageCarousel images={spot.images}/>
                <div className="location-container">
                    <span>{spot.address}, {spot.city}, {spot.state}</span>
                </div>
                <h2>{spot.spotName}</h2>
                <pre>
                    {spot.spotDetails}
                </pre>
            </div>
            )}
        </div>
    )
}


export default SpotsDisplayPage
