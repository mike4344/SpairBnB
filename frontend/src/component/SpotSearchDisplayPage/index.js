// frontend/src/components/SpotsSearchDisplayPage/index.js
import React, { useState, useEffect} from 'react';
import * as SpotActions from '../../store/spots'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow}  from '@react-google-maps/api'
import ImageCarousel from '../ImageCarousel'
import {NavLink} from 'react-router-dom'
import BookingsModal from '../BookingsModal'
import Geocode from "react-geocode";
const containerStyle = {width: '100%', height: '100%'}

function SpotsSearchDisplayPage () {
    const [searchIsLoaded, setSearchIsLoaded] = useState(false)
    const [center, setCenter] = useState({})
    const [search, setSearch] = useState({})
    const [map, setMap] = useState(null)
    const [selectedSpot, setSelectedSpot] = useState({})
    const [location, setLocation] = useState({})
    const [errors, setErrors] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const onSelect = spot => {
        const locationString = spot.location
        const locationArray = locationString.split(',')
        const locationObject = {
        lat: Number(locationArray[0]),
        lng: Number(locationArray[1])
        }
        setLocation(locationObject)
       setSelectedSpot(spot)
    }

    useEffect( () => {
        (async () => {

            if(!searchIsLoaded){
            const data = await SpotActions.searchSpot()

            setSearch(data)

                if(search !== {}){
                    const locationString = data[0].location
                    const locationArray = locationString.split(',')
                    const locationObject = {
                        lat: Number(locationArray[0]),
                        lng: Number(locationArray[1])
                    }

                    setCenter(locationObject)
                    setSearchIsLoaded(true)}

                }
                })()
      }, []);
        const { isLoaded } = useJsApiLoader({
            id: 'google-map-script',
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
          })
          const onLoad = React.useCallback(function callback(map) {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
            setMap(map)
          }, [])
          const onUnmount = React.useCallback(function callback(map) {
            setMap(null)
          }, [])
          const handleSubmit = e =>{
            e.preventDefault()
            Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
            Geocode.setLanguage('en')
            Geocode.setRegion('us')
            Geocode.setLocationType('ROOFTOP')
            console.log('results', searchQuery)
            Geocode.fromAddress(`${searchQuery}`).then((response) => {
                const {lat , lng} = response.results[0].geometry.location
                console.log(lat, lng)
                setCenter({lat, lng})
            }).catch(e => setErrors(e))

          }
    return(
        <div className='page-container'>
            <ul>
                {errors.map((error, idx) => <li key={idx}> {error}</li>)}
            </ul>
            {searchIsLoaded && (
                <div className='search-box'>
                   {isLoaded && (
                       <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onload={onLoad}
                        onUnmount={onUnmount}
                        >
                    <form onSubmit={handleSubmit} className='search-bar'>
                        <input
                        className='search-input'
                        type='text'
                        value={searchQuery}
                        onChange={(e) =>setSearchQuery(e.target.value)}
                        />
                        <button className='search-button' type='submit'>Search</button>
                    </form>
                        {search.map((spotInfo, i) =>{

                                const locationString = spotInfo.location
                                const locationArray = locationString.split(',')
                                const locationObject = {
                                    lat: Number(locationArray[0]),
                                    lng: Number(locationArray[1])
                                }

                            return(

                                <Marker
                                key={i}
                                position={locationObject}
                                onClick={() => {
                                    console.log(spotInfo)
                                    onSelect(spotInfo)}}
                                />
                        )
                        })}
                         {      selectedSpot.location && (
                                <InfoWindow
                                position={location}
                                onCloseClick={() => setSelectedSpot({})}
                                >
                                 <div className='map-spot-display'>
                                    <h1 className='spot-name'>{selectedSpot.spotName}</h1>
                                    <ImageCarousel images={selectedSpot.images} addClass='from-map'/>
                                    <pre className='spot-details'>{selectedSpot.spotDetails}</pre>
                                    <div className='button-box'>
                                    <BookingsModal spotId={selectedSpot.id} />
                                    <NavLink className='signup-button' to={`/spots/${selectedSpot.id}`}>Read More...</NavLink>
                                    </div>
                                </div>
                                </InfoWindow>
                                )
                            }
                        </GoogleMap>
                   )}
                </div>
            )}
        </div>
    )
}
export default SpotsSearchDisplayPage;
