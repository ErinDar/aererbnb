import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as spotActions from '../../../store/spots'
import ListingCard from "./ListingCard";
import '../UserInfo.css'

export default function Listings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots.userSpots)

    let spotsArr = []
    for (let spot in spots) {
        spotsArr.push(spots[spot])
    }

    useEffect(() => {
        if (!user) return
        else dispatch(spotActions.getUserSpots(user))
    }, [dispatch])

    return (
        <div className="listings-body">
            <div className="listing-title">
                <h1>Active Listings</h1>
            </div>
            <div className="listing-container">
                {spotsArr.map(spot => (
                    <ListingCard key={spot.id} spot={spot} />
                ))}
            </div>
        </div>
    )
}