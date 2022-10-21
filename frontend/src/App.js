import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import SignUpFormModal from './components/SignUpFormModal';
import * as spotActions from './store/spots'
import * as sessionActions from './store/session'
import Navigation from './components/Navigation'
import Spots from './components/Spots'
import SpotDetails from './components/SpotDetails';
import SpotReview from './components/Reviews';
// import CreateSpotForm from './components/CreateSpot';

function App() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(spotActions.getAllSpots())
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
    }, [dispatch])

    return (
        <>
            <Navigation />
            {isLoaded && (
                <Switch>
                    <Route exact path='/'>
                        <Spots />
                    </Route>
                    <Route exact path='/spots/:spotId'>
                        <SpotDetails />
                        <SpotReview />
                    </Route>
                    <Route exact path='/hosting'>
                        {/* <CreateSpotForm /> */}
                    </Route>
                    <Route exact path='/my-listings'>

                    </Route>
                </Switch>
            )}
        </>
    )
}

export default App;