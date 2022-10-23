import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { loadReviews } from "../../store/reviews"
import ReviewDetails from "../ReviewDetails"
import './Reviews.css'

export default function SpotReview() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const reviewObj = useSelector(state => state.reviews.allReviews)
    const spotObj = useSelector(state => state.spots.allSpots[spotId])
    const [isLoaded, setIsLoaded] = useState(false)

    let reviews = []
    for (let review in reviewObj) {
        reviews.push(reviewObj[review])
    }

    useEffect(() => {
        dispatch(loadReviews(spotId))
            .then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <>
            {isLoaded && (
                <div className="spot-reviews-section">
                    <div className="spot-reviews-body">
                        <div className="reviews-header">
                            <div><i className="fa-sharp fa-solid fa-star fa-xs" />{spotObj.avgRating ? spotObj.avgRating : 0}</div>
                            <div>{reviews.length === 1 ? `${reviews.length} Review` : reviews.length > 1 ? `${reviews.length} Reviews` : " No Reviews (yet)"}</div>
                        </div>
                        <div className="spot-reviews">
                            {reviews.map(review => (
                                <ReviewDetails key={review.id} spot={review} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}