import React, {useContext} from "react";
import Main from "./main";
import Login from "./login";
import {Context} from "../store/reducer";
import {DefaultTheme, Provider as PaperProvider} from "react-native-paper";
import {StatusBar} from "expo-status-bar";

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#006dff',
        accent: '#f1c40f',
    },
};

export default function Index() {
    const [state, dispatch] = useContext(Context);
    return (
        <PaperProvider theme={theme}>
            {state.loginState ? <Main/> : <Login/>}
            <StatusBar style="light" backgroundColor="#006dff"/>
        </PaperProvider>
    )
}