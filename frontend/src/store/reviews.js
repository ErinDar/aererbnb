import { csrfFetch } from "./csrf";

const POPULATE_REVIEWS = 'reviews/getReviews'
// const NEW_REVIEW = 'reviews/newReview'
const USER_SPOTS_REVIEWS = 'reviews/userSpotsReviews'
// const EDIT_REVIEWS = 'reviews/editReviews'
const DELETE_REVIEWS = 'reviews/deleteReviews'

const populateReviews = (reviews) => {
    return {
        type: POPULATE_REVIEWS,
        reviews
    }
}

// const newReview = (review) => {
//     return {
//         type: NEW_REVIEW,
//         review
//     }
// }

const userSpotsReviews = (reviews) => {
    return {
        type: USER_SPOTS_REVIEWS,
        reviews
    }
}

const deleteUserReviews = (review) => {
    return {
        type: DELETE_REVIEWS,
        review
    }
}
export const userReviews = (user) => async (dispatch) => {
    const res = await csrfFetch('/api/reviews/current')
    if (res.ok) {
        const reviews = await res.json()
        dispatch(userSpotsReviews(reviews.Reviews))
        return reviews
    }
}
export const loadReviews = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`)
    if (res.ok) {
        const reviews = await res.json()
        dispatch(populateReviews(reviews.Reviews))
        return reviews
    }
}

export const createReview = (id, reviewInfo) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewInfo)
    })
    if (res.ok) {
        const review = await res.json()
        dispatch(loadReviews(id))
        return review
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (res.ok) {
        const deletedReview = res.json()
        dispatch(deleteUserReviews(reviewId))
        return deletedReview
    }
}
const initialState = {
    allReviews: {},
    singleReview: {},
    userReviews: {}
}
export default function reviewReducer(state = initialState, action) {
    let newState = {}
    let allReviews = {}
    let userReviews = {}
    switch (action.type) {
        case POPULATE_REVIEWS:
            action.reviews.forEach(review => {
                allReviews[review.id] = review
            })
            return {
                ...state,
                allReviews: { ...allReviews }
            }
        case USER_SPOTS_REVIEWS:
            action.reviews.forEach(review => {
                userReviews[review.id] = review
            })
            return {
                ...state,
                userReviews: { ...userReviews }
            }
        case DELETE_REVIEWS:
            userReviews = { ...state.userReviews }
            newState = { ...state }
            newState.userReviews = userReviews
            delete newState.userReviews[action.review]
            return newState
        default:
            return state
    }
}