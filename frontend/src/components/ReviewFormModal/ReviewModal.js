import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import * as spotActions from '../../store/spots'

export default function CreateReview(spotObj) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState([])

    const redirect = () => {
        return history.push(`/spots/${spotObj.spotId}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const reviewInfo = {
            review: review,
            stars: rating
        }
        await dispatch(reviewActions.createReview(spotObj.spotId, reviewInfo))
            .catch(async (res) => {
                const reviewErrors = await res.json()
                if (reviewErrors) {
                    if (reviewErrors.errors) setErrors(Object.values(reviewErrors.errors))
                    else setErrors([reviewErrors.message])
                }
            })
        await dispatch(spotActions.getAllSpots())
            // dispatch(spotActions.getSpot(spotObj.spotId))
            .then(() => spotObj.setShowModal(false))
            .then(() => redirect())
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul className="error-messages">
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Review
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />
            </label>
            <label>
                Rating Scale (1-5)
                <input
                    type='number'
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                />
            </label>
            <button type='submit'>Submit Review</button>
        </form>
    )
}