import { NavLink } from "react-router-dom";

export default function CreateEditForm() {
    return (
        <div className="listing-links">
            <div className="create-listing">
                <NavLink to='/hosting/create'>
                    <button>Create a Listing</button>
                </NavLink>
            </div>
            <div className="edit-listing">
                <NavLink to='/my-listings'>
                    <button>Edit a Listing</button>
                </NavLink>
            </div>
        </div>
        // <SpotForm spot={spot} formType="Create Listing" />
    )
}