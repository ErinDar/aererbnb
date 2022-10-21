import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import CreateSpotForm from "./CreateSpotForm";
import SpotForm from "./SpotForm";

export default function CreateEditForm() {
    const { spotId } = useParams
    const spot = useSelector(state => state.spots.allSpots[spotId])

    return (
        <div className="listing-links">
            <div className="create-listing">
                <NavLink to='/hosting/create'>
                    <button>Create a Listing</button>
                </NavLink>
            </div>
            <div className="edit-listing">
                <NavLink to='/my-listings/edit'>
                    <button>Edit a Listing</button>
                </NavLink>
            </div>
        </div>
        // <SpotForm spot={spot} formType="Create Listing" />
    )
}