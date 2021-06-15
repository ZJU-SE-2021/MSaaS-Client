import React, {useEffect, useReducer} from 'react';
import {Context, InitialState, Reducer} from "./store/reducer";
import {getContext} from "./store/localStorage";
import Entrypoint from "./src/entrypoint";
import Login from "./src/login";
import {StatusBar} from "expo-status-bar";
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#006dff',
        accent: '#f1c40f',
    },
};

export default function App() {
    const [state, dispatch] = useReducer(Reducer, InitialState);

    function init() {
        try {
            getContext().then((res) => {
                if (res) {
                    dispatch({type: 'RESTORE_CONTEXT', payload: res});
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => init(), []);
    return (
            <Context.Provider value={[state, dispatch]}>
                <PaperProvider theme={theme}>
                    {state.loginState ? <Entrypoint/> : <Login/>}
                    <StatusBar style="light" backgroundColor="#006dff"/>
                </PaperProvider>
            </Context.Provider>
    );
}
