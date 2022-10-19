import { csrfFetch } from "./csrf"

const GET_SPOT = 'spots/getSpot'
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
//edit spot action

//delete spot action

//create spot thunk action
// export const createSpot = (spot) => async (dispatch) => {
//     const { name, address, city, state, country, description, price, lat, lng } = spot
//     const res = await csrfFetch('/api/spots', {
//         method: 'POST',
//         body: JSON.stringify({
//             name,
//             address,
//             city,
//             state,
//             country,
//             description,
//             price,
//             lat,
//             lng
//         })
//     })
//     const spotInfo = await res.json()
//     dispatch(getUserSpots(spotInfo))
//     return res
// }
//get spots thunk action
export const getAllSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots')
    const spots = await res.json()
    dispatch(populateSpots(spots))
}

export const getSpot = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}`)
    const spot = await res.json()
    dispatch(getSingleSpot(spot))
}
//edit spot thunk action

//delete spot thunk action

const initialState = {
    Spots: []
}
export default function spotReducer(state = initialState, action) {
    let spotObj = {}
    switch (action.type) {
        case POPULATE_SPOTS:
            spotObj = { ...state, ...action.spots }
            return spotObj
        case GET_SPOT:
            spotObj = { ...state, ...action.spot }
            return spotObj
        default:
            return state
    }
}