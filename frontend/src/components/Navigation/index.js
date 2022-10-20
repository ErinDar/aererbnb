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
            <div>
                <div className='signup-link login-link'>
                    <NavLink to="/signup" style={{ textDecoration: 'none' }}><i className="fa-solid fa-bars"></i></NavLink>
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
            {/* <div>
                <NavLink exact to='/hosting'>
                    <button>
                        Become a Host
                    </button>
                </NavLink>
            </div> */}
            <div>
                <div>
                    {sessionLinks}
                </div>
            </div>
        </header>
    );
}

export default Navigation;