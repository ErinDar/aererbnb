import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HostLoginForm from './HostLoginForm';

export default function CreateSpotFormModal() {
    const [showModal, setShowModal] = useState(false)
    // const [showLoginModal, setShowLoginModal] = useState(false)
    // const [showSignUpModal, setShowSignUpModal] = useState(false)

    return (
        <>
            <div>
                <button onClick={() => setShowModal(true)} className='hosting-button'>Become a Host</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {/* figuring out a way to toggle between signup and login when clicking become a host */}
                    {/* <div>
                        <button className='login-submit-button'>Log In</button>
                    </div>
                    <div>
                        <button className='login-submit-button'>Sign Up</button>
                    </div> */}
                    <HostLoginForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    )
}