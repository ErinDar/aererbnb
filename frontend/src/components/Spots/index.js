import { useSelector } from 'react-redux'
import SpotCard from '../SpotsCard'

// warning: list need a key prop
// create a separate component for spots
export default function Spots() {
    const spotsObj = useSelector(state => state.spots.allSpots)

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

// export default function Spots() {
//     const spotsObj = useSelector(state => state.spots)

//     let spots;
//     for (let spot in spotsObj) {
//         spots = spotsObj[spot].map(ele => ele)
//     }

//     return (
//         <div className='spots-body'>
//             {spots.map(spot => {
//                 return (
//                     <div className='spots-card'>
//                         <NavLink key={spot.name} to={`/spots/${spot.id}`}>
//                             <img className='spot-image' src='' alt={spot.name}></img>
//                             <div className='spot-info'>
//                                 <div className='spot-location'>{spot.city}, {spot.state}</div>
//                                 <div className='spot-price'>${spot.price}</div>
//                             </div>
//                         </NavLink>
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }