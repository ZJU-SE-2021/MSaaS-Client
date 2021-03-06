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
                setStatus('?????????');
            } else if (res.state === 'InProgress') {
                setStatus('?????????');
            } else {
                setStatus('?????????');
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
            setMessage('????????????????????????');
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
                <Appbar.Content title="????????????" subtitle="MSaaS"/>
            </Appbar.Header>
            <LoadingWrapper isLoading={isLoading}>
                <ScreenWrapper>
                    <Card>
                        <Card.Cover source={pic}/>
                        <Card.Content>
                            <Title>{status}</Title>
                            <Paragraph>{`???????????????${route.params.appointmentId}`}</Paragraph>
                            <Paragraph>{`???????????????${time.toLocaleString('zh-CN')}`}</Paragraph>
                            <Paragraph>{`???????????????${hospitalName}`}</Paragraph>
                            <Paragraph>{`???????????????${departmentName}`}</Paragraph>
                            <Paragraph>{`???????????????${doctorName}`}</Paragraph>
                            <Paragraph>{`???????????????${description}`}</Paragraph>
                            {showMedRec ?
                                <>
                                    <Divider/>
                                    <Title>????????????</Title>
                                    <Paragraph> {`???????????????${symptom}`}</Paragraph>
                                    <Paragraph> {`????????????: ${pastMedicalHistory}`} </Paragraph>
                                    <Paragraph> {`??????: ${diagnosis}`} </Paragraph>
                                    <Paragraph> {`??????: ${prescription}`} </Paragraph>
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
                                ????????????
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