import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Main from "./main";
import MyList from "./appointments/department";

const Stack = createStackNavigator();

export default function Entrypoint() {
    return(
        <NavigationContainer>
            <Stack.Navigator className={'debug'} initialRouteName="Hospital" screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Main}/>
                <Stack.Screen name='Detail' component={MyList}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}