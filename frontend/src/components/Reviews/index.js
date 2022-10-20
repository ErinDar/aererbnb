import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { loadReviews } from "../../store/reviews"
import ReviewDetails from "../ReviewDetails"

export default function SpotReview() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const reviewObj = useSelector(state => state.reviews.allReviews)

    let reviews = []
    for (let review in reviewObj) {
        reviews.push(reviewObj[review])
    }

    useEffect(() => {
        dispatch(loadReviews(spotId))
    }, [dispatch])

    return (
        <div>
            <h2>Reviews</h2>
            {reviews.map(review => (
                <ReviewDetails key={review.id} spot={review} />
            ))}
        </div>
    )
}