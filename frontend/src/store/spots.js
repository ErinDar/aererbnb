import { csrfFetch } from "./csrf"

const GET_SPOT = 'spots/getSingleSpot'
const POPULATE_SPOTS = 'spots/populateSpots'
const POPULATE_USER_SPOTS = 'spots/populateUserSpots'
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
    const spotInfo = await res.json()
    dispatch(getSingleSpot(spotInfo))
    return spotInfo
}
//get spots thunk action
export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')
    const spots = await res.json()
    dispatch(populateSpots(spots.Spots))
}

export const getSpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`)
    const spot = await res.json()
    dispatch(getSingleSpot(spot))
}

export const getUserSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current')
    const userSpots = await res.json()
    dispatch(populateUserSpots(userSpots.Spots))
}
//edit spot thunk action
// export const updateSpot = (spotId) => async (dispatch) => {
//     const res = await csrfFetch(`/api/spots/${spotId}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//             name,
//             address,
//             city,
//             state,
//             country,
//             description,
//             price
//         })
//     })
//     const spotInfo = await res.json()
//     dispatch(getSingleSpot(spotInfo))
//     return res
// }

//delete spot thunk action
export const deleteSpots = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot}`, {
        method: 'DELETE'
    })
    const deletedSpot = res.json()
    dispatch(deleteSpot(spot))
    return deletedSpot
}
const initialState = {
    allSpots: {},
    singleSpot: {},
    userSpots: {}
}

export default function spotReducer(state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case POPULATE_SPOTS:
            const allSpots = {}
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
            return {
                ...state,
                allSpots: { ...allSpots }
            }
        case POPULATE_USER_SPOTS:
            const userSpots = {}
            action.spots.forEach(spot => {
                userSpots[spot.id] = spot
            })
            return {
                ...state,
                userSpots: { ...userSpots }
            }
        case GET_SPOT:
            const singleSpot = { ...action.spot }
            return {
                ...state,
                singleSpot: { ...singleSpot }
            }
        case DELETE_SPOT:
            allSpots = { ...allSpots }
            singleSpot = {}
            userSpots = { ...userSpots }
            newState = { ...state, allSpots: { ...allSpots }, singleSpot: {}, userSpots: { ...userSpots } }
            delete newState.allSpots[action.spot]
            delete newState.userSpots[action.spot]
        default:
            return state
    }
}