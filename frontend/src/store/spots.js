import { csrfFetch } from "./csrf"

const GET_SPOT = 'spots/getSingleSpot'
const POPULATE_SPOTS = 'spots/populateSpots'
const POPULATE_USER_SPOTS = 'spots/populateUserSpots'
const ADD_IMAGE = 'spots/addImage'
const EDIT_SPOT = 'spots/editSpot'
const DELETE_SPOT = 'spots/deleteSpot'


//get spots action(s)
const populateSpots = (spots) => {
    return {
        type: POPULATE_SPOTS,
        spots
    }
}

const populateUserSpots = (spots) => {
    return {
        type: POPULATE_USER_SPOTS,
        spots
    }
}
const getSingleSpot = (spot) => {
    return {
        type: GET_SPOT,
        spot
    }
}

const addImage = (imageInfo) => {
    return {
        type: ADD_IMAGE,
        imageInfo
    }
}
// edit spot action
// const editSpot = (spot) => {
//     return {
//         type: EDIT_SPOT,
//         spot
//     }
// }
//delete spot action
const deleteSpot = (spot) => {
    return {
        type: DELETE_SPOT,
        spot
    }
}
//create spot thunk action
export const createSpot = (spot) => async (dispatch) => {
    const { name, address, city, state, country, description, price } = spot
    const res = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({
            name,
            address,
            city,
            state,
            country,
            description,
            price,

        })
    })
    if (res.ok) {
        const spotInfo = await res.json()
        dispatch(getSingleSpot(spotInfo))
        return spotInfo
    }
}

export const addSpotImage = (spotId, imgInfo) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify(imgInfo)
    })
    if (res.ok) {
        const image = await res.json()
        dispatch(addImage(image))
        return image
    }
}
//get spots thunk action
export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')
    if (res.ok) {
        const spots = await res.json()
        dispatch(populateSpots(spots.Spots))
        return spots
    }
}

export const getSpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`)
    if (res.ok) {
        const spot = await res.json()
        dispatch(getSingleSpot(spot))
        return spot
    }
}

export const getUserSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
    if (res.ok) {
        const userSpots = await res.json()
        dispatch(populateUserSpots(userSpots.Spots))
        return userSpots
    }
}
//edit spot thunk action
export const updateSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
    })
    if (res.ok) {
        const spotInfo = await res.json()
        dispatch(getSingleSpot(spotInfo))
        return spotInfo
    }
}

//delete spot thunk action
export const deleteSpots = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const deletedSpot = res.json()
        dispatch(deleteSpot(spotId))
        return deletedSpot
    }
}
const initialState = {
    allSpots: {},
    singleSpot: {},
    userSpots: {}
}

export default function spotReducer(state = initialState, action) {
    let newState = {}
    let allSpots = {}
    let singleSpot = {}
    let userSpots = {}
    switch (action.type) {
        case POPULATE_SPOTS:
            allSpots = {}
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
            return {
                ...state,
                allSpots: { ...allSpots }
            }
        case POPULATE_USER_SPOTS:
            userSpots = {}
            action.spots.forEach(spot => {
                userSpots[spot.id] = spot
            })
            return {
                ...state,
                userSpots: { ...userSpots }
            }
        case GET_SPOT:
            singleSpot = { ...action.spot }
            return {
                ...state,
                singleSpot: { ...singleSpot }
            }
        case ADD_IMAGE:
            singleSpot = { ...state.singleSpot, SpotImages: [action.image] }
            return {
                ...state,
                singleSpot: { ...singleSpot }
            }
        case DELETE_SPOT:
            allSpots = { ...state.allSpots }
            singleSpot = {}
            userSpots = { ...state.userSpots }
            newState = { ...state }
            newState.allSpots = allSpots
            newState.userSpots = userSpots
            delete newState.allSpots[action.spot]
            delete newState.userSpots[action.spot]
            return newState
        default:
            return state
    }
}