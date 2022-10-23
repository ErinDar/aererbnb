import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'

export default function HostLoginForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    let user = useSelector(state => state.session.user)
    const [password, setPassword] = useState('')
    const [credential, setCredential] = useState('')
    const [errors, setErrors] = useState([])

    const redirect = () => {
        return history.push('/hosting')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        user = await dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const loginErrors = await res.json()
                if (loginErrors) {
                    if (loginErrors.errors) setErrors(Object.values(loginErrors.errors))
                    else setErrors([loginErrors.message])
                }
            })
        if (user) return redirect()
    }

    return (
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
            <div className='submit-button'>
                <button type='submit' className='login-submit-button'>Log In</button>
            </div>
        </form>
    )
}