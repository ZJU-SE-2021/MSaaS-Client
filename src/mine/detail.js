import {Appbar, Button, Card, Paragraph, Title} from 'react-native-paper';
import React, {useContext} from "react";
import {storeContext} from "../../store/localStorage";
import {Context} from "../../store/reducer";
import {StyleSheet, View} from "react-native";
import RecordSelection from "./record"
import {useNavigation} from "@react-navigation/native";
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
                        <Paragraph>Card content</Paragraph>
                        <Button icon="message-bulleted" mode="contained" onPress={() => navigation.navigate('DoctorChat')}>
                            联系医生
                        </Button>
                    </Card.Content>
                </Card>
            </ScreenWrapper>
        </View>
    )
}