import CreateSpotForm from "./CreateSpotForm"

export default function CreateSpot() {
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
        <CreateSpotForm spot={spot} />
    )
}