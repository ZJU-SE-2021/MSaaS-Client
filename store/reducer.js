import {createContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGIN':
            return {
                ...state,
                loginState: action.payload
            };
        default:
            return state;
    }
};

export const InitialState = {
    loginState: false,
}

export const Context = createContext(InitialState);
