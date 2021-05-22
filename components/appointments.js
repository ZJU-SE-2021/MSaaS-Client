import {Appbar} from 'react-native-paper';
import React from "react";
import DepartmentSelection from './department';
import { View } from 'react-native';


export default function Appointments() {
    return (
        <View>
        <Appbar.Header>
            <Appbar.Content title="预约挂号" subtitle="MSaaS"/>
        </Appbar.Header>
        <DepartmentSelection />
        </View>
         
    )
}