import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as spotActions from '../../store/spots'

export default function SpotDetails() {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spotObj = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(spotActions.getSpot(spotId))
    }, [dispatch])

    return (
        <section className='single-spot-card'>
            <div className='single-spot-info'>
                <h1>{spotObj.name}</h1>
                <section>
                    <span>{spotObj.city}, {spotObj.state}, {spotObj.country}</span>
                </section>
                {/* <img src={spotObj.previewImage} alt={spotObj.name} width='400px' height='400px'></img> */}
                <section>
                    <h2>${spotObj.price}</h2>
                </section>
            </div>
            <hr />
            <div>
                <span>{spotObj.description}</span>
            </div>
        </section>
    )
}


