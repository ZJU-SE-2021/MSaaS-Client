import {Appbar, Button} from 'react-native-paper';
import React, {useContext} from "react";
import {storeContext} from "../../store/localStorage";
import {Context} from "../../store/reducer";
import {StyleSheet, View} from "react-native";
import RecordSelection from "./record"
import {useNavigation} from "@react-navigation/native";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});


export default function Mine() {
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation()
    return (
        <View style={style.container}>
            <Appbar.Header >
                <Appbar.Content title="我的" subtitle="MSaaS"/>
                <Appbar.Action icon="account-settings" onPress={() => {navigation.navigate('UserProfile')}} />
            </Appbar.Header>
            <RecordSelection/>
        </View>
    )
}