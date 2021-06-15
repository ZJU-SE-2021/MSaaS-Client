import { Appbar } from 'react-native-paper';
import React from "react";
import {StyleSheet, View} from 'react-native';
import HospitalSelection from './hospitalSelection'


const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function Appointments() {
    return (
        <View style={style.container}>
            <Appbar.Header>
                <Appbar.Content title="预约挂号" subtitle="MSaaS"/>
            </Appbar.Header>
            <HospitalSelection/>
        </View>
    )
}