import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Main from "./main";
import DepartmentList from "./appointments/department";
import {ChatterBot} from "./home/chatterBot";
import DoctorSelection from "./appointments/doctorSelection";
import newAppointment from "./appointments/newAppointment";

const Stack = createStackNavigator();

export default function Entrypoint() {
    return(
        <NavigationContainer>
            <Stack.Navigator className={'debug'} initialRouteName="Hospital" screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Main}/>
                <Stack.Screen name='Detail' component={DepartmentList}/>
                <Stack.Screen name='ChatterBot' component={ChatterBot}/>
                <Stack.Screen name='Doctor' component={DoctorSelection}/>
                <Stack.Screen name='Appointment' component={newAppointment}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}