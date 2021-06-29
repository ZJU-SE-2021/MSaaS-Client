import {Appbar, Card, Paragraph, Snackbar, Title} from 'react-native-paper';
import {StyleSheet, View, Text} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AppointmentsApi, Configuration, SummaryApi, UsersApi} from "../../network";
import {Context} from "../../store/reducer";
import ScreenWrapper from "../components/ScreenWrapper";
import LoadingWrapper from "../components/LoadingWrapper";

const style = StyleSheet.create({
    greeting: {
        paddingTop: 10,
        fontSize: 20
    },
    cards: {
        marginBottom: 10,
        marginHorizontal: 10,
    }
})

const pic = require('../../assets/undraw_doctors_hwty.png')

export default function Home() {
    const navigation = useNavigation();
    const [state, dispatch] = useContext(Context);

    const [name, setName] = useState('');

    const [showRecentApp, setShowRecentApp] = useState(false);
    const [recentAppTime, setRecentAppTime] = useState(new Date());
    const [recentAppDoctor, setRecentAppDoctor] = useState('');
    const [recentAppHospital, setRecentAppHospital] = useState('');
    const [recentAppDepart, setRecentAppDepart] = useState('');
    const [recentAppId, setRecentAppId] = useState(0);

    const [showRecentMedRec, setShowRecentMedRec] = useState(false);
    const [recentMedRecDoctor, setRecentMedDoctor] = useState('');
    const [recentMedRecDiagnosis, setRecentMedRecDiagnosis] = useState('');
    const [recentMedRecPres, setRecentMedRecPres] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(true);

    const getRecentAppDateStr = () => {
        const days = parseInt((recentAppTime.getDate() - (new Date().getDate())));
        return days === 0 ? '今天' : `${days}天后`;
    }

    useEffect(() => {
        const conf = new Configuration({apiKey: state.jwtToken});

        const usersApi = new UsersApi(conf);
        usersApi.getCurrentUser().then(res => {
            setName(res.name);
        }, reason => {
            setMessage('用户信息获取失败');
            setShowMessage(true);
        })

        const summaryApi = new SummaryApi(conf);
        summaryApi.getSummary().then(res => {
            if (res.recentAppointment === undefined) {
                setShowRecentApp(false);
            } else {
                setShowRecentApp(true);
                setRecentAppTime(res.recentAppointment.time);
                setRecentAppDoctor(res.recentAppointment.physician.name);
                setRecentAppHospital(res.recentAppointment.physician.department.hospital.name);
                setRecentAppDepart(res.recentAppointment.physician.department.name);
                setRecentAppId(res.recentAppointment.id);
            }

            if (res.recentMedicalRecord === undefined) {
                setShowRecentMedRec(false);
            } else {
                const appointmentsApi = new AppointmentsApi(conf);
                appointmentsApi.getAppointmentById({
                    id: res.recentMedicalRecord.appointmentId
                }).then(appRes => {
                    setShowRecentMedRec(true);
                    setRecentMedDoctor(appRes.physician.name);
                    setRecentMedRecDiagnosis(res.recentMedicalRecord.diagnosis);
                    setRecentMedRecPres(res.recentMedicalRecord.prescription);
                }, reason => {
                    setMessage('获取近期信息失败');
                    setLoading(false);
                    setShowRecentMedRec(false);
                    setShowMessage(true);
                })
            }

            setLoading(false);
        }, reason => {
            setMessage('获取近期信息失败');
            setLoading(false);
            setShowMessage(true);
        });
    }, [])

    return (
        <View style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.Content title="MSaaS" subtitle="智能医疗系统"/>
            </Appbar.Header>
            <LoadingWrapper isLoading={isLoading}>
                <ScreenWrapper>
                    <Card style={style.cards}>
                        <Card.Cover source={pic}/>
                        <Card.Content>
                            <Title style={style.greeting}>你好，{name}!</Title>
                            <Paragraph>欢迎使用 MSaaS 智能互联网医疗系统！</Paragraph>
                        </Card.Content>
                    </Card>
                    <Card style={style.cards} onPress={() => navigation.navigate('ChatterBot')}>
                        <Card.Title title="智能诊疗" subtitle="快速为您推荐合适的诊疗方案。"/>
                    </Card>
                    {
                        showRecentApp ?
                            <Card style={style.cards} onPress={() => navigation.navigate('Detail', {
                                appointmentId: recentAppId
                            })}>
                                <Card.Title
                                    title={getRecentAppDateStr() + '的诊疗预约'}/>
                                <Card.Content>
                                    <Text>{recentAppDoctor}</Text>
                                    <Text>{recentAppTime.toLocaleString('zh-CN', {hour12: false})}</Text>
                                    <Text>{recentAppHospital + ' | ' + recentAppDepart}</Text>
                                </Card.Content>
                            </Card> : <></>
                    }
                    {
                        showRecentMedRec ?
                            <><Card style={style.cards}>
                                <Card.Title title={recentMedRecDoctor + '医生开具的处方'}/>
                                <Card.Content>
                                    <Text>{recentMedRecPres}</Text>
                                </Card.Content>
                            </Card>
                                <Card style={style.cards}>
                                    <Card.Title title={recentMedRecDoctor + '医生的医嘱'}/>
                                    <Card.Content>
                                        <Text>{recentMedRecDiagnosis}</Text>
                                    </Card.Content>
                                </Card></> : <></>
                    }
                </ScreenWrapper>
            </LoadingWrapper>
            <Snackbar
                visible={showMessage}
                onDismiss={() => setShowMessage(false)}
            >
                {message}
            </Snackbar>
        </View>
    )
}