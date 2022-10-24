import React, { useState } from 'react'
import * as spotActions from '../../../store/spots'
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';

export default function CreateSpotForm({ spot }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [errors, setErrors] = useState([])

    const redirect = (newSpotId) => {
        history.push(`/spots/${newSpotId}`)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const imageInfo = {
            url: imageUrl,
            preview: true
        }
        spot = { ...spot, name, address, city, state, country, description, price }
        const newSpot = await dispatch(spotActions.createSpot(spot))
            .catch(async (res) => {
                const spotErrors = await res.json()
                if (spotErrors) {
                    if (spotErrors.errors) setErrors(Object.values(spotErrors.errors))
                    else setErrors([spotErrors.message])
                }
            })
        if (newSpot) {
            await dispatch(spotActions.addSpotImage(newSpot.id, imageInfo))
                .then(() => redirect(newSpot.id))
        }
        // if (newSpot) {
        //     await dispatch(spotActions.getSpot(newSpot.id))
        //         .then(() => redirect(newSpot.id))
        // }
    }

    return (
        <div>
            <h2>Tell Us About Your Listing</h2>
            <NavLink to='/'>Go Back Home</NavLink>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <label>
                    Listing Name
                    <input
                        type='text'
                        placeholder='Cozy Cabin Getaway...'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Listing Street Address
                    <input
                        type='text'
                        placeholder='123 Main Ave.'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label>
                    Listing City
                    <input
                        type='text'
                        placeholder='Denver'
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </label>
                <label>
                    Listing State
                    <input
                        type='text'
                        placeholder='Colorado'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                </label>
                <label>
                    Listing Country
                    <input
                        type='text'
                        placeholder='USA'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </label>
                <label>
                    Listing Description
                    <textarea
                        placeholder='Escape to this newly renovated....'
                        minLength={10}
                        maxLength={255}
                        style={{ resize: 'none' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <h3>Don't forget to show off your spot!</h3>
                <label>
                    Listing Images
                    <input
                        type='url'
                        placeholder='www.image.com/image.jpg'
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        required
                    />
                </label>
                <h3>Here's the best part</h3>
                <label>
                    Listing Price
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </label>
                <button type='submit' className='create-spot'>Launch Listing</button>
            </form>
        </div>
    )
}