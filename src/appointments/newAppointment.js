import * as React from 'react';
import {Appbar, Button, Caption, Card, Dialog, List, Paragraph, Portal, Snackbar, TextInput} from 'react-native-paper';
import {Image, Platform, StyleSheet, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from "react";
import {AppointmentsApi, Configuratio, Configuration} from "../../network";
import {InitialState as state} from "../../store/reducer";
import DialogWithLoadingIndicator from "../components/Dialog";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const pic = require('../../assets/undraw_medicine_b1ol.png');

const newAppointment = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [showCheck, setShowCheck] = useState(false)
    const [date, setDate] = useState(new Date())
    const [symptom, setSymptom] = useState('')
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    }

    const onSubmit = () => {
        const conf = new Configuration({apiKey: state.jwtToken});
        const appointmentsApi = new AppointmentsApi(conf);

        appointmentsApi.addAppointment({
            appointmentForm: {
                physicianId: route.params.doctor.id,
                description: symptom,
                time: date
            }
        }).then(res => {
            console.log(res);
            setLoading(false);
            navigation.reset({
                index: 1,
                routes: [
                    { name: 'Home' },
                    {
                        name: 'Detail',
                        params: {
                            appointmentId: res.id,
                            doctorName: res.physician.name,
                            hospitalName: 'mmm', // TODO
                            departmentName: res.physician.department.name,
                            timeStr: res.time.toLocaleDateString('zh-CN'),
                            description: res.description
                        }
                    }
                ]
            });
        }, reason => {
            setMessage('预约提交失败');
            setShowMessage(true);
            setLoading(false);
        })

        setLoading(true);
    }

    return <View style={style.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {
                navigation.goBack()
            }}/>
            <Appbar.Content title="挂号" subtitle={`${route.params.hospital} - ${route.params.department} - ${route.params.specificDepartment} - ${route.params.doctor.name}`}/>
        </Appbar.Header>
        <ScreenWrapper>
            <Card>
                <Card.Cover source={pic}/>
            </Card>
            <List.Section title="预约日期">
                {
                    Platform.OS !== 'web' ? <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        onChange={onChange}
                        minimumDate={Date.now()}
                    /> : <Text
                        type="datetime-local"
                        value={date}
                        onChange={onChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                }
                <Caption>
                    这是 {parseInt((date - (new Date())) / (24 * 3600 * 1000))} 天后的预约
                </Caption>
            </List.Section>
            <List.Section title='症状简述'>
                <TextInput
                    placeholder="请简要描述您的症状"
                    mode={'outlined'}
                    multiline
                    value={symptom}
                    onChangeText={setSymptom}
                />
            </List.Section>
            <Button icon="upload" onPress={() => setShowCheck(true)}>
                提交预约
            </Button>
        </ScreenWrapper>
        <Portal>
            <DialogWithLoadingIndicator
                visible={isLoading}
                close={() => setLoading(false)}
                title={'请稍候'}
                content={'正在提交预约...'}
            />
            <Dialog visible={showCheck} onDismiss={() => setShowCheck(false)}>
                <Dialog.Title>预约挂号</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>您正在预约{`${route.params.hospital}${route.params.department}${route.params.specificDepartment}${route.params.doctor.name}医生${date.toLocaleDateString('zh-CN')}的诊疗，症状是${symptom}，请确认无误后继续`}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onSubmit}>确认</Button>
                    <Button onPress={() => setShowCheck(false)}>取消</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
        <Snackbar
            visible={showMessage}
            onDismiss={() => setShowMessage(false)}
        >
            {message}
        </Snackbar>
    </View>
};

export default newAppointment;