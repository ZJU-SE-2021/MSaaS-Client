import {createContext} from "react"

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'RESTORE_CONTEXT':
            return action.payload
        case 'SET_LOGIN':
            const {token, user} = action.payload
            return {
                ...state,
                loginState: true,
                userProfile: user,
                jwtToken: token
            }
        case 'SET_LOGOUT':
            return {
                ...state,
                loginState: false,
                userProfile: {},
                jwtToken: ''
            }
        default:
            return state
    }
};

export const InitialState = {
    loginState: false,
    userProfile: {},
    jwtToken: ''
}

export const Context = createContext(InitialState)
