import {Appbar} from 'react-native-paper';
import React from "react";
import MyList from './department';
import { View } from 'react-native';


export default function Appointments() {
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="预约挂号" subtitle="MSaaS"/>
            </Appbar.Header>
            <View alignItems='center'> 
                <MyList >
                </MyList>
            </View>
        </View>
    )
}