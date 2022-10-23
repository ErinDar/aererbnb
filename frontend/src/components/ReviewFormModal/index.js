import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './ReviewModal';

export default function ReviewButton({ spot }) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <div>
                <button onClick={() => setShowModal(true)} className='review-button'>Leave a Review</button>
            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateReview spot={spot} />
                </Modal>
            )}
        </>
    )
}