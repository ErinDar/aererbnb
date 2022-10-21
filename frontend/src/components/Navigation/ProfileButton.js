import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import DropDownMenu from "./DropDownMenu";

export default function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <div>
            <button onClick={openMenu} className='profile-button'>
                <i className="fas fa-user-circle" />
            </button>
            {showMenu && (
                <div className='menu-items'>
                    <DropDownMenu user={user} />
                    <button onClick={logout}>Log Out</button>
                </div>
            )}
        </div>
    );
}