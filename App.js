import React, {useEffect, useReducer} from 'react';
import Index from "./src";
import {Context, InitialState, Reducer} from "./store/reducer";
import {getContext} from "./store/localStorage";

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
                <Index/>
            </Context.Provider>
    );
}
