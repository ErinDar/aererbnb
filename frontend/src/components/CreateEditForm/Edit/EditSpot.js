import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditSpotForm from "./EditSpotForm";

export default function EditSpot() {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.allSpots[spotId])

    return (
        <EditSpotForm spot={spot} formType="Update Listing" />
    )
}