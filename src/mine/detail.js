import {Appbar, Button, Card, Paragraph, Title} from 'react-native-paper';
import React, {useContext} from "react";
import {storeContext} from "../../store/localStorage";
import {Context} from "../../store/reducer";
import {StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const pic = require('../../assets/undraw_medical_care_movn.png');

function logout(state, dispatch) {
    dispatch({type: 'SET_LOGOUT'})
    storeContext({loginState: false}).then()
}

export default function Detail() {
    const navigation = useNavigation()
    const route = useRoute()
    const [state, dispatch] = useContext(Context)

    return (
        <View style={style.container}>
            <Appbar.Header >
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }}/>
                <Appbar.Content title="详情查看" subtitle="MSaaS"/>
            </Appbar.Header>
            <ScreenWrapper>
                <Card>
                    <Card.Cover source={pic}/>
                    <Card.Content>
                        <Title>已完成</Title>
                        <Paragraph>{`预约序号：${route.params.appointmentId}`}</Paragraph>
                        <Paragraph>{`预约时间：${route.params.timeStr}`}</Paragraph>
                        <Paragraph>{`预约医院：${route.params.hospitalName}`}</Paragraph>
                        <Paragraph>{`预约科室：${route.params.departmentName}`}</Paragraph>
                        <Paragraph>{`预约医生：${route.params.doctorName}`}</Paragraph>
                        <Paragraph>{`症状描述：${route.params.description}`}</Paragraph>
                        <Button icon="message-bulleted" mode="contained" onPress={() => navigation.navigate('DoctorChat', {appointmentId: route.params.appointmentId})}>
                            联系医生
                        </Button>
                    </Card.Content>
                </Card>
            </ScreenWrapper>
        </View>
    )
}