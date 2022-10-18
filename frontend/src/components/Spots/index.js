import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import './Spots.css'

function Spots() {
    // const { spotId } = useParams()
    const spotsObj = useSelector(state => state.spots)

    let spots;
    for (let spot in spotsObj) {
        spots = spotsObj[spot].map(ele => ele)
    }

    return (
        <>
            <h1>Testing Spots components</h1>
            {spots.map(spot => {
                return (
                    <NavLink key={spot.name} to={`/spots/${spot.id}`}>
                        <div className='spots-card'>
                            <div>
                                <img src='' alt={spot.name}></img>
                            </div>
                            <div className='spot-name'>{spot.name}</div>
                            <div className='spot-location'>{spot.city} , {spot.state} , {spot.country}</div>
                            <div className='spot-price'>${spot.price}</div>
                        </div>
                    </NavLink>
                )
            })}
        </>
    )
}

export default Spots