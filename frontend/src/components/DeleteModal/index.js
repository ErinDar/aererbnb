// import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { useHistory } from "react-router-dom";
// import * as spotActions from '../../store/spots'


// const deleteModal = () => {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     const [selected, setSelected] = useState(false)

//     const handleSubmit = async (e) => {
//         await dispatch(spotActions.deleteSpots(spotId))
//             .then(() => dispatch(spotActions.getAllSpots()))
//             .then(() => history.push('/'))
//     }
//     return (
//         <div onClick={() => setShowModal(false)} 
//     )
// }