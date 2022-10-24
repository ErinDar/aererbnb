export default function ReviewDetails(review) {
    return (
        <div className="single-review">
            <div className="review-creator">
                <i className="fa-solid fa-circle-user fa-2xl"></i>
                <h3>{review.spot.User.firstName}</h3>
            </div>
            <div>{review.spot.review}</div>
        </div>
    )
}