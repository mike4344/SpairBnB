// frontend/src/components/SpotsSearchDisplayPage/index.js
import React, { useState, useEffect} from 'react';
import * as SpotActions from '../../store/spots'
import {useDispatch} from 'react-redux'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow}  from '@react-google-maps/api'
import ImageCarousel from '../ImageCarousel'
const containerStyle = {width: '400px', height: '400px'}

function SpotsSearchDisplayPage () {
    const [searchIsLoaded, setSearchIsLoaded] = useState(false)
    const dispatch = useDispatch();
    const [center, setCenter] = useState({})
    const [search, setSearch] = useState({})
    const [map, setMap] = useState(null)
    const [selectedSpot, setSelectedSpot] = useState({})
    const [location, setLocation] = useState({})
    const onSelect = spot => {
        const locationString = spot.location
        const locationArray = locationString.split(',')
        const locationObject = {
        lat: Number(locationArray[0]),
        lng: Number(locationArray[1])
        }
        setLocation(locationObject)
       setSelectedSpot(spot)
        console.log(spot)
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
    return(
        <div className='page-container'>
            {searchIsLoaded && (
                <div className='search'>
                   {isLoaded && (
                       <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={10}
                        onload={onLoad}
                        onUnmount={onUnmount}
                        >
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
                                 <div>
                                    <p>{selectedSpot.spotName}</p>
                                    <ImageCarousel images={selectedSpot.images} />
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
