import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import HostLoginForm from './HostLoginForm';

export default function CreateSpotFormModal() {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div>
                <button onClick={() => setShowModal(true)} className='hosting-button'>Become a Host</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <HostLoginForm />
                </Modal>
            )}
        </>
    )
}