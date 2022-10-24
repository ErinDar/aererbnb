import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import * as spotActions from './store/spots'
import * as sessionActions from './store/session'
import Navigation from './components/Navigation'
import Spots from './components/Spots'
import SpotDetails from './components/SpotDetails';
import SpotReview from './components/Reviews';
import CreateEditForm from './components/CreateEditForm'
import CreateSpot from './components/CreateEditForm/Create/CreateSpot'
import Listings from './components/UserInfo/UserListings';
import EditSpot from './components/CreateEditForm/Edit/EditSpot';
import Reviews from './components/UserInfo/UserProfile';

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
                        <CreateEditForm />
                    </Route>
                    <Route exact path='/hosting/create'>
                        <CreateSpot />
                    </Route>
                    <Route exact path='/my-listings'>
                        <Listings />
                    </Route>
                    <Route exact path='/spots/:spotId/edit'>
                        <EditSpot />
                    </Route>
                    <Route exact path='/profile'>
                        <Reviews />
                    </Route>
                </Switch>
            )}
        </>
    )
}

export default App;