import { useSelector } from 'react-redux'
import SpotCard from '../SpotsCard'

export default function Spots() {
    const spotsObj = useSelector(state => state.spots.allSpots)
    console.log('spotsObj', spotsObj)
    let spots = []
    for (let spot in spotsObj) {
        spots.push(spotsObj[spot])
    }

    return (
        <div>
            {spots.map(spot => (
                <SpotCard key={spot.id} spot={spot} />
            ))}
        </div>
    )
}