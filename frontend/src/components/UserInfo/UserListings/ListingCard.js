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
            <NavLink to={`/spots/${spot.id}`}>{spot.name}</NavLink>
            <NavLink to={`/spots/${spot.id}/edit`}>Edit Listing</NavLink>
            <button onClick={deleteSpot}>Delete Listing</button>
        </div>
    )
}