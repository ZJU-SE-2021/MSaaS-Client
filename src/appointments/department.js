import {StyleSheet, View} from 'react-native';
import * as React from 'react';
import {Appbar, List} from 'react-native-paper';
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";


const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mockDepartmentsData = [
    {
        name: '门诊部',
        departments: [
            '呼吸科',
            '心内科',
            '消化科',
            '外科',
            '儿科',
            '妇科',
            '眼科',
            '耳鼻喉科'
        ]
    },
    {
        name: '急诊室',
        departments: [
            '发烧急诊',
            '吃坏肚子急诊',
            '诺如病毒急诊'
        ]
    },
    {
        name: '住院部',
        departments: [
            '内科住院部',
            '外科住院部',
            '妇产科住院部',
            '儿科住院部',
            '监护室'
        ]
    },
    {
        name: '放射科',
        departments: [
            '我也不知道放射科里有啥'
        ]
    }
]

const DepartmentList = () => {
    const navigation = useNavigation();
    const route = useRoute();

    return (
        <View style={style.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }}/>
                <Appbar.Content title="选择科室" subtitle={route.params.hospital.name}/>
            </Appbar.Header>
            <ScreenWrapper>
                <List.Section title="请选择部门下属的科室">
                    {mockDepartmentsData.map(({name, departments}) => {
                        return <List.Accordion
                            title={name}
                            left={props => <List.Icon {...props} icon="hospital-building"/>}>
                            {departments.map((department) => {
                                return <List.Item title={department}/>
                            })}
                        </List.Accordion>
                    })}
                </List.Section>
            </ScreenWrapper>
        </View>
    );
};

export default DepartmentList;



