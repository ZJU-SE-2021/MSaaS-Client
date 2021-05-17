import React, {createContext, useEffect, useReducer, useState} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Main from "./components/main";
import {StatusBar} from "expo-status-bar";
import Login from "./components/login";
import Index from "./components";
import {Reducer, InitialState, Context} from "./store/reducer";
import {getContext} from "./store/localStorage";

function init(dispatch) {
    try {
        getContext().then((res) => {
            if (res) {
                dispatch({type: 'SET_LOGIN', payload: res.loginState});
            }
        })
    } catch (e) {
        console.log(e)
    }
}

export default function App() {
    const [state, dispatch] = useReducer(Reducer, InitialState);
    useEffect(() => init(dispatch), []);
    return (
            <Context.Provider value={[state, dispatch]}>
                <Index/>
            </Context.Provider>
    );
}
