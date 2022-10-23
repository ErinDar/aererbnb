import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session'

export default function ProfileButton() {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const [showMenu, setShowMenu] = useState(false)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }
    useEffect(() => {
        if (!showMenu) return
        const closeMenu = () => {
            setShowMenu(false)
        }
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const logout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout())
        history.push('/')
    }

    return (
        <div onClick={openMenu} className='profile-button'>
            <i className="fa-solid fa-bars"></i>
            <i className="fas fa-user-circle"></i>
            {showMenu && (
                <div className="menu-items">
                    <li>
                        <div className='display-name'>
                            Hey, {user.firstName}!
                        </div>
                    </li>
                    <li>
                        <NavLink to='/my-listings' style={{ textDecoration: 'none' }}>
                            <button className='listings-button'>Manage Listings</button>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/profile' style={{ textDecoration: 'none' }}>
                            <button className='account-button'>Account</button>
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={logout} className='logout-button'>Log Out</button>
                    </li>
                </div>
            )
            }
        </div >
    )
}