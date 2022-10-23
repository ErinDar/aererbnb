import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginSignUp from './LoginSignUp';
import HostFormModal from '../HostFormModal';
import './Navigation.css';


export default function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <div className='logged-in-user-links'>
                <NavLink exact to='/hosting'>
                    <button className='logged-in-hosting'>Switch to Hosting</button>
                </NavLink>
                <ProfileButton user={sessionUser} />
            </div>
        );
    } else {
        sessionLinks = (
            <div className='user-links'>
                <HostFormModal />
                <LoginSignUp />
            </div>
        );
    }

    return (
        <header className='nav-bar'>
            <div className='nav-elements'>
                <NavLink exact to="/" style={{ textDecoration: 'none' }}>
                    <button className='airbnb-logo'>
                        <div className='airbnb-icon'>
                            <i className="fa-brands fa-airbnb fa-3x"></i>
                        </div>
                        <div className='text-logo'>aererbnb</div>
                    </button>
                </NavLink>
            </div>
            <div className='session-links'>
                {sessionLinks}
            </div>
        </header>
    );
}