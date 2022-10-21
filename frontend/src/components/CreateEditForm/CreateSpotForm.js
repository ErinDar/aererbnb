import SpotForm from "./SpotForm";

export default function CreateSpotForm() {
    const spot = {
        name: '',
        address: '',
        city: '',
        state: '',
        country: '',
        description: '',
        price: ''
    }

    return (
        <SpotForm spot={spot} formType="Create Listing" />
    )
}