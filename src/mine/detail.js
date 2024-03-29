import {Appbar, Button, Card, Divider, Paragraph, Snackbar, Title} from 'react-native-paper';
import React, {useContext, useEffect, useState} from "react";
import {storeContext} from "../../store/localStorage";
import {Context} from "../../store/reducer";
import {StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import {AppointmentsApi, Configuration, UsersApi} from "../../network";
import LoadingWrapper from "../components/LoadingWrapper";

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

    const [time, setTime] = useState(new Date());
    const [hospitalName, setHospitalName] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('InProgress');
    const [symptom, setSymptom] = useState('');
    const [pastMedicalHistory, setPastMedicalHistory] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [prescription, setPrescription] = useState('');
    const [showMedRec, setShowMedRec] = useState(false);

    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const conf = new Configuration({apiKey: state.jwtToken});
        const appointmentsApi = new AppointmentsApi(conf);

        appointmentsApi.getAppointmentById({
            id: route.params.appointmentId
        }).then(res => {
            setTime(res.time);
            setHospitalName(res.physician.department.hospital.name);
            setDepartmentName(res.physician.department.name);
            setDoctorName(res.physician.name);
            setDescription(res.description);
            if (res.state === 'Created') {
                setStatus('已预约');
            } else if (res.state === 'InProgress') {
                setStatus('进行中');
            } else {
                setStatus('已结束');
            }
            if (res.medicalRecord !== undefined) {
                setShowMedRec(true);
                setSymptom(res.medicalRecord.symptom);
                setPastMedicalHistory(res.medicalRecord.pastMedicalHistory);
                setDiagnosis(res.medicalRecord.diagnosis);
                setPrescription(res.medicalRecord.prescription);
            }
            setLoading(false);
        }, reason => {
            setMessage('预约信息获取失败');
            setShowMessage(true);
            setLoading(false);
        })
    }, []);

    return (
        <View style={style.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack();
                }}/>
                <Appbar.Content title="详情查看" subtitle="MSaaS"/>
            </Appbar.Header>
            <LoadingWrapper isLoading={isLoading}>
                <ScreenWrapper>
                    <Card>
                        <Card.Cover source={pic}/>
                        <Card.Content>
                            <Title>{status}</Title>
                            <Paragraph>{`预约序号：${route.params.appointmentId}`}</Paragraph>
                            <Paragraph>{`预约时间：${time.toLocaleString('zh-CN')}`}</Paragraph>
                            <Paragraph>{`预约医院：${hospitalName}`}</Paragraph>
                            <Paragraph>{`预约科室：${departmentName}`}</Paragraph>
                            <Paragraph>{`预约医生：${doctorName}`}</Paragraph>
                            <Paragraph>{`症状描述：${description}`}</Paragraph>
                            {showMedRec ?
                                <>
                                    <Divider/>
                                    <Title>诊疗记录</Title>
                                    <Paragraph> {`医生诊断：${symptom}`}</Paragraph>
                                    <Paragraph> {`过往病史: ${pastMedicalHistory}`} </Paragraph>
                                    <Paragraph> {`医嘱: ${diagnosis}`} </Paragraph>
                                    <Paragraph> {`处方: ${prescription}`} </Paragraph>
                                </>
                                : <></>
                            }
                            <Button icon="message-bulleted" mode="contained"
                                    onPress={() => navigation.navigate('DoctorChat',
                                        {
                                            appointmentId: route.params.appointmentId,
                                            doctorName
                                        })
                                    }>
                                联系医生
                            </Button>
                        </Card.Content>
                    </Card>
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