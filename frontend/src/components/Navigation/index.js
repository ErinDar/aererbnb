import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import HostFormModal from '../HostFormModal';
import './Navigation.css';


function Navigation() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    // if some is logged in profile button is visible
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        // if not the log in and sign up buttons are
        sessionLinks = (
            <div>
                <div className='user-links'>
                    <NavLink to="/signup" style={{ textDecoration: 'none' }}><i className="fa-solid fa-bars fa-xl"></i></NavLink>
                    <LoginFormModal />
                </div>
            </div >
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

export default Navigation;