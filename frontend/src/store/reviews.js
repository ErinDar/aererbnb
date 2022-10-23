import { csrfFetch } from "./csrf";

const POPULATE_REVIEWS = 'reviews/getReviews'
const NEW_REVIEW = 'reviews/newReview'
const EDIT_REVIEWS = 'reviews/editReviews'
const DELETE_REVIEWS = 'reviews/deleteReviews'

const populateReviews = (reviews) => {
    return {
        type: POPULATE_REVIEWS,
        reviews
    }
}

const newReview = (review) => {

}
export const loadReviews = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`)
    const reviews = await res.json()
    dispatch(populateReviews(reviews.Reviews))
}

export const createReview = (id, reviewInfo) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewInfo)
    })
    if (res.ok) {
        const review = await res.json()
        dispatch(newReview(review))
        return review
    }
}
const initialState = {
    allReviews: {},
    singleReview: {}
}
export default function reviewReducer(state = initialState, action) {
    let allReviews = {}
    switch (action.type) {
        case POPULATE_REVIEWS:
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