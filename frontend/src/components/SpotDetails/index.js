import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as spotActions from '../../store/spots'
import './SpotDetail.css'

export default function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const [isLoaded, setIsLoaded] = useState(false)
    const spotObj = useSelector(state => state.spots.allSpots[spotId])
    const currSpot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))
            .then(() => dispatch(spotActions.getAllSpots()))
            .then(() => setIsLoaded(true))
    }, [dispatch, isLoaded])

    return (
        <>
            {isLoaded && (
                <section className='single-spot-card'>
                    <div className='single-spot-info'>
                        <div className='single-spot-name'>
                            <h1>{spotObj.name}</h1>
                        </div>
                        <div className='subheader-single-spot'>
                            <div className='single-spot-ratings'>
                                <i className="fa-sharp fa-solid fa-star fa-xs" /> {spotObj.avgRating ? spotObj.avgRating : 0}
                            </div>
                            <div className='single-spot-location'>
                                <span>{spotObj.city}, {spotObj.state}</span>
                            </div>
                        </div>
                        <div className='single-spot-image'>
                            <img src={spotObj.previewImage} alt={spotObj.name} width='50%' height='50%'></img>
                        </div>
                        <section className='single-spot-price'>
                            <h2>${spotObj.price} per night</h2>
                        </section>
                        <div className='spot-owner'>
                            <h3>Entire Listing Hosted by {currSpot.Owner.firstName}</h3>
                        </div>
                        <div className='single-spot-description'>
                            <span>{spotObj.description}</span>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}


