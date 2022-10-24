import React, { useState, useEffect } from 'react'
import * as spotActions from '../../../store/spots'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

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
        <form onSubmit={handleSubmit}>
            <h2>{formType}</h2>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label>
                Listing Name
                <input
                    type='text'
                    value={name}
                    onChange={updateName}
                />
            </label>
            <label>
                Listing Street Address
                <input
                    type='text'
                    value={address}
                    onChange={updateAddress}
                />
            </label>
            <label>
                Listing City
                <input
                    type='text'
                    value={city}
                    onChange={updateCity}
                />
            </label>
            <label>
                Listing State
                <input
                    type='text'
                    value={state}
                    onChange={updateState}
                />
            </label>
            <label>
                Listing Country
                <input
                    type='text'
                    value={country}
                    onChange={updateCountry}
                />
            </label>
            <label>
                Listing Description
                <textarea
                    value={description}
                    onChange={updateDescription}
                />
            </label>
            <label>
                Listing Price
                <input
                    type='number'
                    value={price}
                    onChange={updatePrice}
                />
            </label>
            <button type='submit' className='create-spot'>Update Listing</button>
        </form>
    )
}