import {Searchbar, List, FAB, Card, Button, Snackbar} from 'react-native-paper';
import React, {useContext, useEffect, useState} from "react";
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {AppointmentsApi, Configuration, CreateHospitalRequest, HospitalCreationForm, HospitalsApi} from "../../network";
import {Context, InitialState as state} from "../../store/reducer";
import LoadingWrapper from "../components/LoadingWrapper";

class Record {
    constructor(id, hospital, department, date, status) {
        this.id = id
        this.hospital = hospital
        this.department = department
        this.date = date
        this.status = status
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    scrollView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 3,
        flexWrap: 'wrap',
        height: 700
    },
    card: {
        marginBottom: 5,
        marginTop: 5,
        alignSelf: 'center',
        width: '95%',
        backgroundColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        shadowOpacity: 0.13,
        borderRadius: 5,
        shadowColor: 'rgba(96, 96, 96, 1)'
    }
})


export default function RecordSelection() {
    const navigation = useNavigation();
    const [state, dispatch] = useContext(Context)

    const [searchQuery, setSearchQuery] = useState('');
    const [records, setRecords] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(true);
    const onChangeSearch = query => setSearchQuery(query);

    function getRecords() {
        const conf = new Configuration({apiKey: state.jwtToken});
        const appointmentsApi = new AppointmentsApi(conf);

        appointmentsApi.getAppointments().then(res => {
            let temp = [];
            for (const appointment of res) {
                temp.push(new Record(
                    appointment.id,
                    appointment.physician.department.hospital.name,
                    appointment.physician.department.name,
                    appointment.time,
                    appointment.state
                ));
            }
            setRecords(temp);
            setLoading(false);
        }, reason => {
            setMessage('预约信息列表获取失败');
            setShowMessage(true);
            setLoading(false);
        });
    }

    useEffect(() => {
        getRecords();
    }, []);

    const recordIconMap = {
        'Finished': 'sticker-check-outline',
        'InProgress': 'medical-bag',
        'Created': 'calendar',
    }

    return (
        <View style={style.container}>
            <Searchbar placeholder='搜索诊疗记录' onChangeText={onChangeSearch} value={searchQuery}/>
            <LoadingWrapper isLoading={isLoading}>
            <ScrollView>
                {records
                    .filter((record) => {
                        return (record.hospital.includes(searchQuery) || record.department.includes(searchQuery));
                    })
                    .map((record) => {
                        return <List.Item
                            style={style.card}
                            key={record.id}
                            title={record.hospital + ' ' + record.department}
                            left={props => <List.Icon {...props} icon={recordIconMap[record.status]}/>}
                            description={record.date.toLocaleDateString('zh-CN')}
                            onPress={() => navigation.navigate('Detail', {
                                appointmentId: record.id
                            })}
                        />
                    })}
            </ScrollView>
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