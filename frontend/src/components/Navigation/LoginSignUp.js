import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Modal } from '../../context/Modal'
import LoginForm from '../LoginFormModal'
import SignupForm from '../SignUpFormModal'
import * as sessionActions from '../../store/session'

export default function LoginSignUp() {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)

    const demoUser = () => {
        const userInfo = {
            credential: 'Demo-lition',
            password: "password"
        }
        dispatch(sessionActions.login(userInfo))
    }

    const openMenu = () => {
        if (showMenu) return
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

    return (
        <div>
            <div onClick={openMenu} className='profile-button'>
                <i className="fa-solid fa-bars"></i>
                <i className="fas fa-user-circle"></i>
                {showMenu && (
                    <div className="menu-items">
                        <li>
                            <button onClick={() => setShowLoginModal(true)} className='login-button'>Log In</button>
                        </li>
                        <li>
                            <button onClick={() => setShowSignUpModal(true)} className='signup-button'>Sign Up</button>
                        </li>
                        <li>
                            <button onClick={() => demoUser()} className='demo-button'>Demo User Log In</button>
                        </li>
                    </div>
                )}
            </div>
            {showLoginModal && (
                <Modal onClose={() => setShowLoginModal(false)}>
                    <LoginForm setShowLoginModal={setShowLoginModal} />
                </Modal>
            )}
            {showSignUpModal && (
                <Modal onClose={() => setShowSignUpModal(false)}>
                    <SignupForm setShowSignUpModal={setShowSignUpModal} />
                </Modal>
            )}
        </div>

    )
}