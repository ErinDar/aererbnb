import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch } from 'react-redux'
import './LoginForm.css'

function LoginForm() {
    const dispatch = useDispatch()
    const [password, setPassword] = useState('')
    const [credential, setCredential] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        return dispatch(sessionActions.login({ credential, password }))
            .catch(async (res) => {
                const loginErrors = await res.json()
                if (loginErrors) {
                    if (loginErrors.errors) setErrors(Object.values(loginErrors.errors))
                    else setErrors([loginErrors.message])
                }
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Username or Email
                <input
                    type="text"
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                // required : may need if change format of login
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                // required : may need if change format of login
                />
            </label>
            <button type='submit'>Log In</button>
        </form>
    )
}

export default LoginForm