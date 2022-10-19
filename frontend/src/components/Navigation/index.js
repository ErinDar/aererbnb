import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <div className='button-links'>
                <NavLink to="/signup" style={{ textDecoration: 'none' }}><i class="fa-solid fa-bars"></i></NavLink>
                <LoginFormModal />
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
                <button className='profile-menu'>
                    {sessionLinks}
                </button>
            </div>
        </header>
    );
}

export default Navigation;