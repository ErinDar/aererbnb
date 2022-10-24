import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch } from 'react-redux'
import './LoginForm.css'

export default function LoginForm({ setShowLoginModal }) {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [credential, setCredential] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const fetchDone = await dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const loginErrors = await res.json()
                if (loginErrors) {
                    if (loginErrors.errors) setErrors(Object.values(loginErrors.errors))
                    else setErrors([loginErrors.message])
                }
            })
        if (fetchDone) setShowLoginModal(false)
    }

    return (
        <div>
            <div onClick={() => setShowLoginModal(false)} className='exit-button'>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <header className='modal-header'>
                <div className='modal-title'>
                    <div>
                        Log In
                    </div>
                </div>
            </header>
            <form onSubmit={handleSubmit}>
                <ul className='error-messages'>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Username or Email
                    <input
                        type="text"
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
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
                <div className='submit-button-div'>
                    <button type='submit' className='login-submit-button'>Log In</button>
                </div>
            </form>
        </div>
    )
}