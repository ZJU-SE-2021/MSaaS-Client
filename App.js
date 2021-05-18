import React, {useEffect, useReducer} from 'react';
import Index from "./components";
import {Context, InitialState, Reducer} from "./store/reducer";
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
