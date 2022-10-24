import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import './CreateEditForm.css'

export default function CreateEditForm() {
    const user = useSelector(state => state.session.user)
    return (
        <div className="hosting-body">
            <h1>Welcome {user.firstName},</h1>
            <div className="listing-links">
                <div className="create-listing">
                    <div className="create-listing-header">
                        <h3>Would you like to create a new listing today?</h3>
                    </div>
                    <NavLink to='/hosting/create' style={{ textDecoration: 'none' }} className="create-listing-link">
                        Create Listing
                        {/* <button>Create a Listing</button> */}
                    </NavLink>
                </div>
                <div className="edit-listing">
                    <div className="edit-listing-header">
                        <h3>How about updating a few that need more traction?</h3>
                    </div>
                    <NavLink to='/my-listings' style={{ textDecoration: 'none' }} className='edit-listing-link'>
                        Edit Listing
                        {/* <button>Edit a Listing</button> */}
                    </NavLink>
                </div>
            </div>
        </div >
        // <SpotForm spot={spot} formType="Create Listing" />
    )
}