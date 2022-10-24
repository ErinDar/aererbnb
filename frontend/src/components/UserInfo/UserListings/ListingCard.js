import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import * as spotActions from '../../../store/spots'
import '../UserInfo.css'

export default function ListingCard({ spot }) {
    const dispatch = useDispatch()

    const deleteSpot = (e) => {
        e.preventDefault()
        dispatch(spotActions.deleteSpots(spot.id))
    }

    return (
        <div className="listing-info-container">
            <div className="listing-info">
                <h2>{spot.name}</h2>
                <NavLink to={`/spots/${spot.id}`}>
                    <img src={spot.previewImage} alt={spot.name} width='400px' height='400px'></img>
                </NavLink>
            </div>
            <div className="listing-actions">
                <NavLink to={`/spots/${spot.id}/edit`} style={{ textDecoration: 'none' }}>
                    <button className="edit-listing-button">Edit Listing</button>
                </NavLink>
                <button onClick={deleteSpot}>Delete Listing</button>
            </div>
        </div>
    )
}