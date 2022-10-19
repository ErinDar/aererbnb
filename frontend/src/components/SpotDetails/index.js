import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as spotActions from '../../store/spots'

export default function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots)
    const targetSpot = spot.Spots.find(ele => ele.id === Number.parseInt(spotId))

    useEffect(() => {
        dispatch(spotActions.getSpot(targetSpot.id))
    }, [dispatch])

    return (
        <section className='single-spot-card'>
            <div className='single-spot-info'>
                <h1>{targetSpot.name}</h1>
                <section>
                    <span>{targetSpot.city}, {targetSpot.state}</span>
                </section>
                <img src={targetSpot.previewImage} alt={targetSpot.name} width='400px' height='400px'></img>
                <section>
                    <h2>${targetSpot.price}</h2>
                </section>
            </div>
            <hr />
            <div>

            </div>
        </section>
    )
}


