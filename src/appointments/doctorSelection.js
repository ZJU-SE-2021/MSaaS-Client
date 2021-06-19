import * as React from 'react';
import {Appbar, List} from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const DoctorSelection = () => {
    const navigation = useNavigation()
    const route = useRoute()

    return <View style={style.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {
                navigation.goBack()
            }}/>
            <Appbar.Content title="选择医生" subtitle={`${route.params.hospital} - ${route.params.department} - ${route.params.specificDepartment}`}/>
        </Appbar.Header>
        <ScreenWrapper>
            <List.Section title="请选择科室下属的医生">
                <List.Item
                    title="qr 的女朋友"
                    description="华家池医学部"
                    left={props => <List.Icon {...props} icon="account"/>}
                    onPress={() => navigation.navigate('Appointment', {...route.params, doctor: 'qrqrqr'})}
                />
            </List.Section>
        </ScreenWrapper>
    </View>
};

export default DoctorSelection;