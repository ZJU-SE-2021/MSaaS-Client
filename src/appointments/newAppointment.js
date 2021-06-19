import * as React from 'react';
import {Appbar, Button, Caption, Card, Dialog, List, Paragraph, Portal, TextInput} from 'react-native-paper';
import {Image, Platform, StyleSheet, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import DateTimePicker from '@react-native-community/datetimepicker';
import {useState} from "react";

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

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    }

    const onSubmit = () => {
        // navigation
    }

    return <View style={style.container}>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => {
                navigation.goBack()
            }}/>
            <Appbar.Content title="挂号" subtitle={`${route.params.hospital} - ${route.params.department} - ${route.params.specificDepartment} - ${route.params.doctor}`}/>
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
            <Dialog visible={showCheck} onDismiss={() => setShowCheck(false)}>
                <Dialog.Title>预约挂号</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>您正在预约{`${route.params.hospital}${route.params.department}${route.params.specificDepartment}${route.params.doctor}医生${date.toLocaleDateString('zh-CN')}的诊疗，症状是${symptom}，请确认无误后继续`}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onSubmit}>确认</Button>
                    <Button onPress={() => setShowCheck(false)}>取消</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </View>
};

export default newAppointment;