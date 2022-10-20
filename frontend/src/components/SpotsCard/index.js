import { NavLink } from "react-router-dom";

export default function SpotCard({ spot }) {
    return (
        <div>
            <NavLink to={`/spots/${spot.id}`}>
                <img src={spot.previewImage} alt={spot.name} width='400px' height='400px' />
            </NavLink>
            <div>
                <span>{spot.city}, {spot.state}</span>
                <h3>${spot.price}</h3>
            </div>
        </div>
    )
}