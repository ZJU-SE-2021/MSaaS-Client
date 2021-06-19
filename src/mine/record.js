import {Searchbar, List, FAB, Card, Button} from 'react-native-paper';
import React, {useState} from "react";
import {View, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from "@react-navigation/native";

class Record {
    constructor(hospital, department, date, status) {
        this.hospital = hospital
        this.department = department
        this.date = (date)
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
    const navigation = useNavigation()

    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const records = [
        new Record('杭州市第一医院', '呼吸科', "2021/4/10 9:30", "scheduled"),
        new Record('杭州市第一医院', '消化科', "2021/3/10 11:00", "pending"),
        new Record('浙大医学院附属第一医院', '呼吸科', "2021/2/10 15:50", "done"),
        new Record('杭州市第二医院', '儿科', "2021/1/10 14:20", "done"),
    ];

    const recordIconMap = {
        'done': 'sticker-check-outline',
        'pending': 'medical-bag',
        'scheduled': 'calendar-month'
    }

    return (
        <View style={style.container}>
            <Searchbar placeholder='搜索诊疗记录' onChangeText={onChangeSearch} value={searchQuery}/>
            <ScrollView>
                {records.filter((record) => {
                    return (record.hospital.includes(searchQuery) || record.department.includes(searchQuery)
                        || record.date.includes(searchQuery))
                })
                    .map((record, index) => {
                        return <List.Item
                            style={style.card}
                            key={index}
                            title={record.hospital + ' ' + record.department}
                            left={props => <List.Icon {...props} icon={recordIconMap[record.status]}/>}
                            description={record.date}
                            onPress={() => navigation.navigate('Detail')}
                        />
                    })}
            </ScrollView>
        </View>
    )
}