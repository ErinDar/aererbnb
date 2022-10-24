import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as reviewActions from '../../../store/reviews'

export default function ReviewCard({ review }) {
    const dispatch = useDispatch()

    const deleteReview = (e) => {
        e.preventDefault()
        dispatch(reviewActions.deleteReview(review.id))
    }

    return (
        <div className="listing-info-container">
            <div className="listing-info">
                <h2>{review.Spot.name}</h2>
                <NavLink to={`/spots/${review.Spot.id}`}>
                    <img src={review.Spot.previewImage} alt={review.Spot.name} width='400px' height='400px'></img>
                </NavLink>
            </div>
            <div className="review-info">
                <div>Review: {review.review}</div>
                <div>Rating: {review.stars}</div>
            </div>
            <div className="listing-actions">
                <button onClick={deleteReview}>Delete Review</button>
            </div>
        </div>
    )
}