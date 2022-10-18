import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import SignupFormPage from './components/SignUpFormPage';
import * as sessionActions from './store/session'
import * as spotActions from './store/spots'
import Navigation from './components/Navigation'
import Spots from './components/Spots'

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
                    <Route path='/signup'>
                        <SignupFormPage />
                    </Route>
                </Switch>
            )}
            <div>
                <Spots />
            </div>
        </>
    )
}

export default App;