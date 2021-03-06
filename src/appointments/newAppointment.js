import * as React from 'react';
import {Appbar, Button, Caption, Card, Dialog, List, Paragraph, Portal, Snackbar, TextInput} from 'react-native-paper';
import {Platform, StyleSheet, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useContext, useState} from "react";
import {AppointmentsApi, Configuration} from "../../network";
import {Context, InitialState as state} from "../../store/reducer";
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
    const [state, dispatch] = useContext(Context)

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
                            appointmentId: res.id
                        }
                    }
                ]
            });
        }, reason => {
            setMessage('??????????????????');
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
            <Appbar.Content title="??????" subtitle={`${route.params.hospital} - ${route.params.department} - ${route.params.specificDepartment} - ${route.params.doctor.name}`}/>
        </Appbar.Header>
        <ScreenWrapper>
            <Card>
                <Card.Cover source={pic}/>
            </Card>
            <List.Section title="????????????">
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
                    ?????? {parseInt((date - (new Date())) / (24 * 3600 * 1000))} ???????????????
                </Caption>
            </List.Section>
            <List.Section title='????????????'>
                <TextInput
                    placeholder="???????????????????????????"
                    mode={'outlined'}
                    multiline
                    value={symptom}
                    onChangeText={setSymptom}
                />
            </List.Section>
            <Button icon="upload" onPress={() => setShowCheck(true)}>
                ????????????
            </Button>
        </ScreenWrapper>
        <Portal>
            <DialogWithLoadingIndicator
                visible={isLoading}
                close={() => setLoading(false)}
                title={'?????????'}
                content={'??????????????????...'}
            />
            <Dialog visible={showCheck} onDismiss={() => setShowCheck(false)}>
                <Dialog.Title>????????????</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>???????????????{`${route.params.hospital}${route.params.department}${route.params.specificDepartment}${route.params.doctor.name}??????${date.toLocaleDateString('zh-CN')}?????????????????????${symptom}???????????????????????????`}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onSubmit}>??????</Button>
                    <Button onPress={() => setShowCheck(false)}>??????</Button>
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