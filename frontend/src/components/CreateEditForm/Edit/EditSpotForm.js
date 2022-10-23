import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SpotForm from "./SpotForm";

export default function EditSpotForm() {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots.allSpots[spotId])

    return (
        <SpotForm spot={spot} formType="Update Listing" />
    )
}