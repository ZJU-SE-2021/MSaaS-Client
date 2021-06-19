import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Main from "./main";
import DepartmentList from "./appointments/department";
import {ChatterBot} from "./home/chatterBot";

const Stack = createStackNavigator();

export default function Entrypoint() {
    return(
        <NavigationContainer>
            <Stack.Navigator className={'debug'} initialRouteName="Hospital" screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Main}/>
                <Stack.Screen name='Detail' component={DepartmentList}/>
                <Stack.Screen name='ChatterBot' component={ChatterBot}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}