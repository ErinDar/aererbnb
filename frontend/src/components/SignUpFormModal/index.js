import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignUpForm';

export default function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div>
                <button onClick={() => setShowModal(true)} className='signup-button'><i className="fa-solid fa-bars"></i></button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupForm />
                </Modal>
            )}
        </>
    )
}