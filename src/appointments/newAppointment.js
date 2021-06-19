import * as React from 'react';
import {Appbar, List} from 'react-native-paper';
import {StyleSheet, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const newAppointment = () => {
    const navigation = useNavigation()
    const route = useRoute()

    return <View style={style.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {
                navigation.goBack()
            }}/>
            <Appbar.Content title="挂号" subtitle={`${route.params.hospital} - ${route.params.department} - ${route.params.specificDepartment} - ${route.params.doctor}`}/>
        </Appbar.Header>
        <ScreenWrapper>
            <>
                <Text>
                    TBD // TODO
                </Text>
            </>
        </ScreenWrapper>
    </View>
};

export default newAppointment;