import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as spotActions from '../../../store/spots'

export default function ListingCard({ spot }) {
    const dispatch = useDispatch()

    const deleteSpot = (e) => {
        e.preventDefault()
        dispatch(spotActions.deleteSpots(spot.id))
    }

    return (
        <div>
            <div className="listing-info">
                <div>{spot.name}</div>
                <NavLink to={`/spots/${spot.id}`}>
                    <img src={spot.previewImage} alt={spot.name} width='200px' height='200px'></img>
                </NavLink>
            </div>
            <div className="listing-actions">
                <NavLink to={`/spots/${spot.id}/edit`}>Edit Listing</NavLink>
                <button onClick={deleteSpot}>Delete Listing</button>
            </div>
        </div>
    )
}