import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as spotActions from '../../../store/spots'
import ListingCard from "./ListingCard";

export default function Listings() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots.allSpots)
    console.log('user', user)
    let spotsArr = []
    for (let spot in spots) {
        spotsArr.push(spots[spot])
    }

    useEffect(() => {
        if (!user) return
        else dispatch(spotActions.getUserSpots(user))
    }, [dispatch])

    return (
        <div className="listing-container">
            {spotsArr.map(spot => (
                <ListingCard key={spot.id} spot={spot} />
            ))}
        </div>
    )
}