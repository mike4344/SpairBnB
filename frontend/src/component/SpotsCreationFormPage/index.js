// frontend/src/components/SpotsCreationFormPage/index.js
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as SpotActions from '../../store/spots'

function SpotsCreationFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user)
    const [images, setImages] = useState([])
    const [spotName, setSpotName] = useState('')
    const [spotDetails, setSpotDetails] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [errors, setErrors] = useState([])

    if(!sessionUser) return <Redirect to="/" />

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([]);

        return dispatch(SpotActions.createSpot({images, spotName, spotDetails, location, address, city, state}))
    }
}
