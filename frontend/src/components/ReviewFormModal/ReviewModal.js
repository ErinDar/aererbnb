import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as reviewActions from "../../store/reviews";

export default function CreateReview({ spotInfo }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [errors, setErrors] = useState([])

    const redirect = () => {
        return history.push(`/spots/${spotInfo.id}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        const reviewInfo = {
            review,
            stars: rating
        }
        const review = dispatch(reviewActions.createReview(spotInfo.id, reviewInfo))
            .catch(async (res) => {
                const reviewErrors = await res.json()
                if (reviewErrors) {
                    if (reviewErrors.errors) setErrors(Object.values(reviewErrors.errors))
                    else setErrors([reviewErrors.message])
                }
            })
        if (review) return redirect()
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