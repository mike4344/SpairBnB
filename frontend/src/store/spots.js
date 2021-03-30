// frontend/src/store/spots.js
import {csrfFetch} from './csrf'

const SET_SPOT = 'spot/setSpot'
const REMOVE_SPOT = 'spot/removeSpot'


const setSpot = (spot, images) => {
    return {
        type: SET_SPOT,
        payload: {
            ...spot,
            images
        }
    }
}

const removeSpot = () => {
    return {
        type: REMOVE_SPOT
    }
}


export const getSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/:${spotId}`)
    const data = await response.json();
    dispatch(setSpot(data.spot, data.images))
    return response
}
export const deleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/:${spotId}`, {
        method: 'DELETE'
    })
    dispatch(removeSpot())
    return response
}
export const updateSpot = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })
    const data = await response.json();
    dispatch(setSpot(data.spot, data.images))
    return response
}
export const createSpot = (spot) => async (dispatch) => {
    const {images, spotName, spotDetails, location, address, city, state } = spot
    console.log(images)
    const formData = new FormData()
    formData.append('spotName', spotName)
    formData.append('spotDetails', spotDetails)
    formData.append('location', location)
    formData.append('address', address)
    formData.append('city', city)
    formData.append('state', state)
    if (images && images.length !== 0){
        for(let i = 0; i < images.length; i++){
            formData.append('images', images[i])
        }
    }
    console.log(formData.toString())
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })
    const data = await response.json();

    dispatch(setSpot(data.spot, data.images))
    return response
}
const spotReducer = (state={spot:null}, action) => {
    let newState;
    switch (action.type) {
        case SET_SPOT:
            newState = Object.assign({}, state);
            newState.spot = action.payload
            return newState
        case REMOVE_SPOT:
            newState = Object.assign({}, state);
            newState.spot = null
            return newState
        default:
            return state
    }
}
export default spotReducer
