import * as React from 'react';
import {Appbar, Card, List, Snackbar} from 'react-native-paper';
import {StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import {useEffect, useState} from "react";
import LoadingWrapper from "../components/LoadingWrapper";
import {Configuration, PhysiciansApi} from "../../network";
import {InitialState as state} from "../../store/reducer";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const DoctorSelection = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [isLoading, setIsLoading] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState('')

    useEffect(() => {
        const conf = new Configuration({apiKey: state.jwtToken});
        const physiciansApi = new PhysiciansApi(conf);

        physiciansApi.getPhysicians({
            departmentId: route.params.depId
        }).then(res => {
            let temp = [];
            for (const doctor of res) {
                temp.push({ id: doctor.id, name: doctor.name });
            }
            setDoctors(temp);
            setIsLoading(false);
        }, reason => {
            setMessage('医生列表获取失败');
            setShowMessage(true);
            setIsLoading(false);
        })
    }, [])

    return <View style={style.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {
                navigation.goBack()
            }}/>
            <Appbar.Content title="选择医生" subtitle={`${route.params.hospital} - ${route.params.department} - ${route.params.specificDepartment}`}/>
        </Appbar.Header>
        <ScreenWrapper>
            <LoadingWrapper isLoading={isLoading}>
            <List.Section title="请选择科室下属的医生">
                {doctors.map((doctor, index) => {
                    return (<List.Item
                            key={index}
                            title={doctor.name}
                            left={props => <List.Icon {...props} icon="account"/>}
                            onPress={() => navigation.navigate('Appointment', {...route.params, doctor})}
                    />);
                })}
            </List.Section>
            </LoadingWrapper>
        </ScreenWrapper>
        <Snackbar
            visible={showMessage}
            onDismiss={() => setShowMessage(false)}
        >
            {message}
        </Snackbar>
    </View>
};

export default DoctorSelection;