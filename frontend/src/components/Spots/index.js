import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Spots.css'

function Spots() {
    const spotsObj = useSelector(state => state.spots)

    let spots;
    for (let spot in spotsObj) {
        spots = spotsObj[spot].map(ele => ele)
    }

    return (
        <div className='spots-body'>
            {spots.map(spot => {
                return (
                    <div className='spots-card'>
                        <NavLink key={spot.name} to={`/spots/${spot.id}`}>
                            <img className='spot-image' src='' alt={spot.name}></img>
                            <div className='spot-info'>
                                <div className='spot-location'>{spot.city}, {spot.state}</div>
                                <div className='spot-price'>${spot.price}</div>
                            </div>
                        </NavLink>
                    </div>
                )
            })}
        </div>
    )
}

export default Spots