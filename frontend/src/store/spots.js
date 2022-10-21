import { csrfFetch } from "./csrf"

const GET_SPOT = 'spots/getSingleSpot'
const POPULATE_SPOTS = 'spots/populateSpots'
const EDIT_SPOT = 'spots/editSpot'
const DELETE_SPOT = 'spots/deleteSpot'


//get spots action(s)
const populateSpots = (spots) => {
    return {
        type: POPULATE_SPOTS,
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
        type: DELETE_SPOT
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
    return res
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

const initialState = {
    allSpots: {},
    singleSpot: {}
}

export default function spotReducer(state = initialState, action) {
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
        case GET_SPOT:
            const singleSpot = { ...action.spot }
            return {
                allSpots: { ...state.allSpots },
                singleSpot: { ...singleSpot }
            }
        default:
            return state
    }
}