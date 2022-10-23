import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import * as reviewActions from "../../store/reviews"
import * as spotActions from '../../store/spots'
import ReviewDetails from "../ReviewDetails"
import ReviewButton from "../ReviewFormModal"
import './Reviews.css'

export default function SpotReview() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const reviewObj = useSelector(state => state.reviews.allReviews)
    const spotObj = useSelector(state => state.spots.allSpots[spotId])
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showButton, setShowButton] = useState(false)

    let reviews = []
    for (let review in reviewObj) {
        reviews.push(reviewObj[review])
    }

    useEffect(() => {
        // if (!reviews.find(review => review.userId === user.id)) setShowButton(true)
        dispatch(spotActions.getSpot(spotId))
            .then(() => dispatch(reviewActions.loadReviews(spotId)))
            .then(() => setIsLoaded(true))
            .then(() => {
                if (user) {
                    if (!reviews.find(review => review.userId === user.id)) setShowButton(true)
                }
            })
    }, [dispatch, showButton, isLoaded, user])

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
                        {showButton && user.id !== spotObj.ownerId &&
                            <div className='create-review'>
                                <ReviewButton spot={spotObj} />
                            </div>
                        }
                    </div>
                </div>
            )}
        </>
    )
}