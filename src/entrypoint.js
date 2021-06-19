import React from 'react'
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Main from "./main";
import DepartmentList from "./appointments/department";
import {ChatterBot} from "./home/chatterBot";
import DoctorSelection from "./appointments/doctorSelection";
import newAppointment from "./appointments/newAppointment";
import Detail from "./mine/detail";
import UserProfile from "./mine/profile";
import DoctorChat from "./mine/doctorChat";

const Stack = createStackNavigator();

export default function Entrypoint() {
    return(
        <NavigationContainer>
            <Stack.Navigator className={'debug'} initialRouteName="Home" screenOptions={{headerShown: false}}>
                <Stack.Screen name='Home' component={Main}/>
                <Stack.Screen name='Hospital' component={DepartmentList}/>
                <Stack.Screen name='ChatterBot' component={ChatterBot}/>
                <Stack.Screen name='Doctor' component={DoctorSelection}/>
                <Stack.Screen name='Appointment' component={newAppointment}/>
                <Stack.Screen name='Detail' component={Detail}/>
                <Stack.Screen name='UserProfile' component={UserProfile}/>
                <Stack.Screen name='DoctorChat' component={DoctorChat}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}