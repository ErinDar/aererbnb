import React, { useState, useEffect } from 'react'
import * as spotActions from '../../../store/spots'
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';

export default function EditSpotForm({ spot, formType }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [name, setName] = useState(spot.name)
    const [address, setAddress] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [country, setCountry] = useState(spot.country)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [errors, setErrors] = useState([])


    const updateName = (e) => setName(e.target.value)
    const updateAddress = (e) => setAddress(e.target.value)
    const updateCity = (e) => setCity(e.target.value)
    const updateState = (e) => setState(e.target.value)
    const updateCountry = (e) => setCountry(e.target.value)
    const updateDescription = (e) => setDescription(e.target.value)
    const updatePrice = (e) => setPrice(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        spot = { ...spot, name, address, city, state, country, description, price }
        const newSpot = await dispatch(spotActions.updateSpot(spot))
            .catch(async (res) => {
                const spotErrors = await res.json()
                if (spotErrors) {
                    if (spotErrors.errors) setErrors(Object.values(spotErrors.errors))
                    else setErrors([spotErrors.message])
                }
            })
        if (newSpot) {
            history.push(`/spots/${spot.id}`)
        }
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     const spotInfo = {
    //         ...spot,
    //         name,
    //         address,
    //         city,
    //         state,
    //         country,
    //         description,
    //         price
    //     }
    //     dispatch(spotActions.updateSpot(spotInfo))
    //     history.push(`/spots/${spotInfo.id}`)
    // }

    return (
        <div className='form-container'>
            <div className='form-header'>
                <h1>Update {spot.name}</h1>
            </div>
            <div className='form-container-smaller'>
                <form onSubmit={handleSubmit}>
                    <ul className='error-messages' style={{ listStyleType: 'none' }}>
                        {errors.map((error, idx) => <li key={idx} className='errors'>*{error}</li>)}
                    </ul>
                    <div className='form-input-values'>
                        <h3>Listing Name</h3>
                        <input
                            type='text'
                            value={name}
                            onChange={updateName}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>Listing Street Address</h3>
                        <input
                            type='text'
                            value={address}
                            onChange={updateAddress}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing City
                        </h3>
                        <input
                            type='text'
                            value={city}
                            onChange={updateCity}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing State
                        </h3>
                        <input
                            type='text'
                            value={state}
                            onChange={updateState}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing Country
                        </h3>
                        <input
                            type='text'
                            value={country}
                            onChange={updateCountry}
                        />
                    </div>
                    <div className='form-input-values'>
                        <h3>
                            Listing Description
                        </h3>
                        <textarea
                            minLength={10}
                            maxLength={255}
                            style={{ resize: 'none' }}
                            value={description}
                            onChange={updateDescription}
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
                            onChange={updatePrice}
                        />
                    </div>
                    <div className='form-footer'>
                        <div className='cancel-create-link'>
                            <NavLink to='/'>Go back home</NavLink>
                        </div>
                        <div className='create-spot-submit-button'>
                            <button type='submit' className='listing-button'>Update Listing</button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    )
}