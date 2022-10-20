import { csrfFetch } from "./csrf";

const POPULATE_REVIEWS = 'reviews/getReviews'
const EDIT_REVIEWS = 'reviews/editReviews'
const DELETE_REVIEWS = 'reviews/deleteReviews'

const populateReviews = (reviews) => {
    return {
        type: POPULATE_REVIEWS,
        reviews
    }
}

export const loadReviews = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`)
    const reviews = await res.json()
    dispatch(populateReviews(reviews.Reviews))
}

const initialState = {
    allReviews: {},
    singleReview: {}
}
export default function reviewReducer(state = initialState, action) {
    switch (action.type) {
        case POPULATE_REVIEWS:
            const allReviews = {}
            action.reviews.forEach(review => {
                allReviews[review.id] = review
            })
            return {
                ...state,
                allReviews: { ...allReviews }
            }
        default:
            return state
    }
}