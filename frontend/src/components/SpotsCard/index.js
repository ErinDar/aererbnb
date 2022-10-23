import { NavLink } from "react-router-dom";

export default function SpotCard({ spot }) {
    return (
        <div className="spot-card">
            <div className="spot-image">
                <NavLink to={`/spots/${spot.id}`}>
                    <img src={spot.previewImage} alt={spot.name} width='400px' height='400px' />
                </NavLink>
            </div>
            <div className="spot-info">
                <div className="spot-header">
                    <div className="location">{spot.city}, {spot.state}</div>
                    <div className="ratings"><i className="fa-sharp fa-solid fa-star fa-xs" />{spot.avgRating ? spot.avgRating : 0}</div>
                </div>
                <div className="price">
                    <h3>${spot.price}/night</h3>
                </div>
            </div>
        </div>
    )
}