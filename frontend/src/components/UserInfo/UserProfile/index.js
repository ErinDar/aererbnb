import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as reviewActions from '../../../store/reviews'
import ReviewCard from "./ReviewsCard";

export default function Reviews() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const reviews = useSelector(state => state.reviews.userReviews)

    let reviewArr = []
    for (let review in reviews) {
        reviewArr.push(reviews[review])
    }

    useEffect(() => {
        if (!reviews) return
        else dispatch(reviewActions.userReviews(user))
    }, [])

    return (
        <div className="listings-body">
            <div className="listing-title">
                <h1>Current Reviews</h1>
            </div>
            <div className="listing-container">
                {reviewArr.map(review => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div >
    )
}