// frontend/src/components/SpotsDisplayPage/index.js
import React, { useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import * as SpotActions from '../../store/spots'
import ImageCarousel from '../ImageCarousel'
import BookingsModal from '../BookingsModal'
import ReviewModal from '../ReviewModal'
import ReviewDisplayPage from '../ReviewDisplayPage'
function SpotsDisplayPage () {
    const dispatch = useDispatch();
    const [reload, setReload]  = useState(false)
    const {spotId} = useParams()
    const [spotIsLoaded, setSpotIsLoaded] = useState(false);
    useEffect(() => {
      dispatch(SpotActions.getSpot(spotId)).then(() => setSpotIsLoaded(true));
    }, [dispatch]);
    const spot = useSelector(state=> state.spot.spot)
    function handleChange (reload) {
        setReload(!reload)
      }
    useEffect(() => {
        console.log(reload)
    },[reload])

    return (
        <div className="page-container">
            {spotIsLoaded && (
            <div className="spot-container">
                <ImageCarousel images={spot.images} addClass='from-page' />
                <div className="location-container">
                    <span>{spot.address}, {spot.city}, {spot.state}</span>
                </div>
                <h1 className="spot-name">Welcome to {spot.spotName}</h1>
                <pre className="spot-details">
                    {spot.spotDetails}
                </pre>
                <div className='button-container'>
                <BookingsModal spotId={spot.id} />
                <ReviewModal spotId={spot.id} onChange={handleChange} reload={reload} />
                </div>
                <ReviewDisplayPage spotId={spot.id} change={reload} onChange={handleChange} />
            </div>
            )}
        </div>
    )
}


export default SpotsDisplayPage
