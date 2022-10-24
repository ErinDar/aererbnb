import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import * as spotActions from '../../store/spots'

export default function CreateReview(spotObj) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(1)
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
        const fetchDone = await dispatch(reviewActions.createReview(spotObj.spotId, reviewInfo))
            .catch(async (res) => {
                const reviewErrors = await res.json()
                if (reviewErrors) {
                    if (reviewErrors.errors) setErrors(Object.values(reviewErrors.errors))
                    else setErrors([reviewErrors.message])
                }
            })
        if (fetchDone) {
            await dispatch(spotActions.getAllSpots())
                .then(() => spotObj.setShowModal(false))
                .then(() => redirect())
        }
    }

    return (
        <div>
            <div onClick={() => spotObj.setShowModal(false)} className='exit-button'>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <header className='modal-header'>
                <div className='modal-title' >
                    <h2>Say Something Nice!</h2>
                </div>
            </header>
            <form onSubmit={handleSubmit} className="review-form">
                <ul className="error-messages">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className="review-content">
                    <label>
                        Review
                    </label>
                    <textarea
                        value={review}
                        placeholder="Did you enjoy your stay?"
                        onChange={(e) => setReview(e.target.value)}
                    />
                </div>
                <div className="review-rating">
                    <label>
                        Rating Scale (1-5)
                    </label>
                    <input
                        type='number'
                        min={1}
                        max={5}
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </div>
                <div className="form-submit-button">
                    <button type='submit' className="submit-review-button">Submit Review</button>
                </div>
            </form>
        </div>
    )
}