import { csrfFetch } from './csrf';

const LOGIN_USER = 'session/loginUser'
const LOGOUT_USER = 'session/logoutUser'

// login action
const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
}

//logout action
const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

// login thunk action
export const login = (user) => async (dispatch) => {
    const { credential, password } = user
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify({
            credential, password
        })
    })
    const userInfo = await res.json()
    dispatch(loginUser(userInfo))
    return res
}

// storing user info thunk action 
export const restoreUser = () => async dispatch => {
    const res = await csrfFetch('/api/session')
    const userInfo = await res.json()
    dispatch(loginUser(userInfo))
    return res
}

// signup thunk action
export const signup = (user) => async dispatch => {
    const { username, email, password, firstName, lastName } = user;
    const res = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password,
        }),
    });
    const userInfo = await res.json();
    dispatch(loginUser(userInfo));
    return res;
};

// logout thunk action
export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE',
    });
    dispatch(logoutUser());
    return res;
};

// default state
const initialState = { user: null }

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case LOGIN_USER:
            newState = { user: action.user }
            return newState
        case LOGOUT_USER:
            newState = { user: null }
            return newState
        default:
            return state
    }
}

export default sessionReducer