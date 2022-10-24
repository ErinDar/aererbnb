import React, { useState } from 'react'
import * as spotActions from '../../../store/spots'
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import '../CreateEditForm.css'

export default function CreateSpotForm({ spot }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
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
        <div className='form-container'>
            <div className='form-header'>
                <h1>Tell Us About Your Listing</h1>
            </div>
            <div className='form-container-smaller'>
                <form onSubmit={handleSubmit} className='create-spot-form'>
                    <ul className='error-messages' style={{ listStyleType: 'none' }}>
                        {errors.map((error, idx) => <li key={idx} className='errors'>*{error}</li>)}
                    </ul>
                    <div className='form-input-values'>
                        <h3>Listing Name</h3>
                        <input
                            type='text'
                            placeholder='Cozy Cabin Getaway...'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing Street Address
                        </h3>
                        <input
                            type='text'
                            placeholder='123 Main Ave.'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing City
                        </h3>
                        <input
                            type='text'
                            placeholder='Denver'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing State
                        </h3>
                        <input
                            type='text'
                            placeholder='Colorado'
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing Country
                        </h3>
                        <input
                            type='text'
                            placeholder='USA'
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing Description
                        </h3>
                        <textarea
                            placeholder='Escape to this newly renovated....'
                            minLength={10}
                            maxLength={255}
                            style={{ resize: 'none' }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing Images
                        </h3>
                        <input
                            type='url'
                            placeholder='www.image.com/image.jpg'
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing Price
                        </h3>
                        <input
                            type='number'
                            value={price}
                            min={90}
                            max={4000}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className='form-footer'>
                        <div className='cancel-create-link'>
                            <NavLink to='/my-listings'>Go Back My Listings</NavLink>
                        </div>
                        <div className='create-spot-submit-button'>
                            <button type='submit' className='listing-button'>Launch Listing</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}