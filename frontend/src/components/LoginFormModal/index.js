import React, { useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal'
import LoginForm from './LoginForm';

export default function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* <div>
                <NavLink to="/hosting">
                    <button onClick={() => setShowModal(true)} className='hosting-button'>Become a Host</button>
                </NavLink>
            </div> */}
            <div>
                <button onClick={() => setShowModal(true)} className='login-button'><i className="fas fa-user-circle" /></button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginForm />
                </Modal>
            )}
        </>
    );
}