import React from "react";
import { NavLink } from "react-router-dom";

export default function DropDownMenu({ user }) {
    return (
        <div className="account-items">
            <ul className="profile-dropdown" style={{ listStyleType: 'none' }}>
                <div className="user-name">
                    <li>{user.username}</li>
                </div>
                <div className="user-email">
                    <li>{user.email}</li>
                </div>
                <div className="user-listings">
                    <NavLink to='/my-listings' style={{ textDecoration: 'none' }}>Manage Listings</NavLink>
                </div>
                <div className="user-profile">
                    <NavLink to='/profile' style={{ textDecoration: 'none' }}>Account</NavLink>
                </div>
            </ul>
        </div>
    )
}