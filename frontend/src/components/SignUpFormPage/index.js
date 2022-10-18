import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import './SignupForm.css'

function SignupFormPage() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
                .catch(async (res) => {
                    const signUp = await res.json();
                    if (signUp && signUp.errors) setErrors(Object.values(signUp.errors));
                });
        }
        // trying to see if I can get both validation errors and the confirm password errors to display at the same time
        if (password !== confirmPassword) {
            setErrors([])
            dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
                .catch(async (res) => {
                    const signUp = await res.json()
                    if (signUp && signUp.errors) {
                        const validationErrors = Object.values(signUp.errors)
                        const passwordErrors = ['Confirm Password field must be the same as the Password field']
                        setErrors([...validationErrors, ...passwordErrors])
                    }
                })
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                First Name
                <input
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </label>
            <label>
                Last Name
                <input
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </label>
            <label>
                Email
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                // required
                />
            </label>
            <label>
                Username
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                // required
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                // required
                />
            </label>
            <label>
                Confirm Password
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                // required
                />
            </label>
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupFormPage;