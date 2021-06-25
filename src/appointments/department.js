import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import {Appbar, List, Snackbar} from 'react-native-paper';
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import {useContext, useEffect, useState} from "react";
import {Configuration, DepartmentsApi, GetDepartmentsRequest, HospitalsApi} from "../../network";
import {Context, InitialState as state} from "../../store/reducer";
import LoadingWrapper from "../components/LoadingWrapper";


const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const DepartmentList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [state, dispatch] = useContext(Context)

    const [isLoading, setIsLoading] = useState(true);
    const [showMessage, setShowMessage] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState('')

    function getDepartments() {
        const conf = new Configuration({apiKey: state.jwtToken});
        const departmentsApi = new DepartmentsApi(conf);

        departmentsApi.getDepartments({
            hospitalId: route.params.hospital.id
        }).then(res => {
            let temp = [];

            for (const department of res) {
                const matched = temp.filter(sec => { return sec.name === department.section; });
                if (matched.length === 0) {
                    temp.push({
                        name: department.section,
                        departments: [ {
                            depName: department.name,
                            depId: department.id
                        } ]
                    });
                } else {
                    matched[0].departments.push({
                        depName: department.name,
                        depId: department.id
                    });
                }
            }

            setDepartments(temp);
            setIsLoading(false);
        }, reason => {
            setMessage('科室列表获取失败');
            setShowMessage(true);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getDepartments();
    }, [])

    return (
        <View style={style.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }}/>
                <Appbar.Content title="选择科室" subtitle={route.params.hospital.name}/>
            </Appbar.Header>
            <ScreenWrapper>
                <LoadingWrapper isLoading={isLoading}>
                <List.Section title="请选择部门下属的科室">
                    {departments.map(({name, departments}) => {
                        return <List.Accordion
                            title={name}
                            key={name}
                            left={props => <List.Icon {...props} icon="hospital-building"/>}>
                            {departments.map(({depId, depName}) => {
                                return <List.Item key={depId} title={depName} onPress={() => {
                                    navigation.navigate('Doctor', {
                                        hospital: route.params.hospital.name,
                                        department: name,
                                        specificDepartment: depName,
                                        depId: depId
                                    })
                                }}/>
                            })}
                        </List.Accordion>
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
    );
};

export default DepartmentList;



