import React, { useState } from 'react'
import * as spotActions from '../../store/spots'
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

export default function CreateSpotForm() {
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [image, setImage] = useState([])
    const [errors, setErrors] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        return dispatch(spotActions.createSpot({ name, address, city, state, country, description, price }))
            .catch(async (res) => {
                const spotErrors = await res.json()
                if (spotErrors) {
                    if (spotErrors.errors) setErrors(Object.values(spotErrors.errors))
                    else setErrors([spotErrors.message])
                }
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Listing Name
                <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Listing Street Address
                <input
                    type='text'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>
            <label>
                Listing City
                <input
                    type='text'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </label>
            <label>
                Listing State
                <input
                    type='text'
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </label>
            <label>
                Listing Country
                <input
                    type='text'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                />
            </label>
            <label>
                Listing Description
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                Listing Price
                <input
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </label>
            <label>
                Listing Images
                <input
                    type='image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </label>
            <button type='submit' className='create-spot'>Create Listing</button>
        </form>
    )
}