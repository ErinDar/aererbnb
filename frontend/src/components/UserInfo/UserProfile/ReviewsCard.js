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
        <div>
            <div>
                <NavLink to={`/spots/${review.Spot.id}`}>
                    <img src={review.Spot.previewImage}></img>
                </NavLink>
                {review.Spot.name}
            </div>
            <div>{review.review}</div>
            <button onClick={deleteReview}>Delete Review</button>
        </div>
    )
}