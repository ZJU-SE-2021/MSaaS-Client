import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Main from "./components/main";
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

export default function App() {
  return (
      <PaperProvider theme={theme}>
        <Main />
        <StatusBar style="light" />
      </PaperProvider>
  );
}
