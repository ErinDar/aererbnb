import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
    const modalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(modalRef.current);
    }, [])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    );
}

export function Modal({ onClose, children }) {
    const modalNode = useContext(ModalContext);
    if (!modalNode) return null;
    return ReactDOM.createPortal(
        <div id="modal">
            <div></div>
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                <div onClick={onClose} className='exit-button'>
                    <i className="fa-solid fa-xmark"></i>
                </div>
                <header className='modal-header'>
                    <div className='modal-title'>
                        <h1>
                            <div>Log In or Sign Up</div>
                        </h1>
                    </div>
                </header>
                {children}
            </div>
        </div>,
        modalNode
    );
}