import { useSelector } from 'react-redux'
import SpotCard from '../SpotsCard'
import './Spots.css'

export default function Spots() {
    const spotsObj = useSelector(state => state.spots.allSpots)

    let spots = []
    for (let spot in spotsObj) {
        spots.push(spotsObj[spot])
    }

    return (
        <div className='spots-body'>
            {spots.map(spot => (
                <SpotCard key={spot.id} spot={spot} />
            ))}
        </div>
    )
}