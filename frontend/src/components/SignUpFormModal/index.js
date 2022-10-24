import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as sessionActions from '../../store/session'
import './SignupForm.css'

export default function SignupForm({ setShowSignUpModal }) {
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            const fetchDone = await dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
                .catch(async (res) => {
                    const signUp = await res.json();
                    if (signUp && signUp.errors) setErrors(Object.values(signUp.errors));
                });
            if (fetchDone) setShowSignUpModal(false)
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
    }

    return (
        <div>
            <div onClick={() => setShowSignUpModal(false)} className='exit-button'>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <header className='modal-header'>
                <div className='modal-title'>
                    <div>
                        Sign Up
                    </div>
                </div>
            </header>
            <form onSubmit={handleSubmit}>
                <ul className='error-messages'>
                    {errors.map((error, idx) => <li key={idx} className='errors'>*{error}</li>)}
                </ul>
                <label>
                    First Name
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Confirm Password
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <div className='submit-button'>
                    <button type="submit" className='signup-submit-button'>Sign Up</button>
                </div>
            </form>
        </div>
    );
}