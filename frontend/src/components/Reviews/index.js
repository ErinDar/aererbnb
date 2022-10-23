import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Modal } from '../../context/Modal';
import * as reviewActions from "../../store/reviews"
import * as spotActions from '../../store/spots'
import ReviewDetails from "../ReviewDetails"
import CreateReview from "../ReviewFormModal/ReviewModal"
import './Reviews.css'

export default function SpotReview() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const reviewObj = useSelector(state => state.reviews.allReviews)
    const spotObj = useSelector(state => state.spots.allSpots[spotId])
    const user = useSelector(state => state.session.user)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))
            .then(() => dispatch(reviewActions.loadReviews(spotId)))
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    let showButton;
    let reviews = []
    for (let review in reviewObj) {
        reviews.push(reviewObj[review])
    }

    if (user) {
        let foundUserReview = reviews.find(review => review.userId === user.id)
        if (foundUserReview === undefined) showButton = true
    }

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
                                <button onClick={() => setShowModal(true)}>Leave a Review</button>
                            </div>
                        }
                    </div>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <CreateReview spot={spotObj} spotId={spotId} setShowModal={setShowModal} />
                        </Modal>
                    )}
                </div>
            )}
        </>
    )
}