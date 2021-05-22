import { Searchbar, List, FAB, Card, Button } from 'react-native-paper';
import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from 'react-native';

class Record {
    constructor(hospital, department, date, status) {
        this.hospital = hospital;
        this.department = department;
        this.date = (date)
        this.status = status
    }
}


const style = StyleSheet.create({
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
        marginBottom:10,
        marginTop:10,
        alignSelf: 'center',
        width: '95%',
        backgroundColor: '#ffffff',
        shadowOffset: { // 设置阴影偏移量
            width: 0,
            height: 4
        },
        shadowRadius: 4, // 设置阴影模糊半径
        shadowOpacity: 0.13, // 设置阴影的不透明度
        borderRadius: 5, // 设置圆角
        shadowColor: 'rgba(96,96,96,1)' // 设置阴影色
    }
})


export default function RecordSelection() {
    const [searchQuery, setSearchQuery] = useState('');
    // const [cardOrList, setCardOrList] = useState(false);
    const onChangeSearch = query => setSearchQuery(query);

    const records = [new Record('杭州市第一医院', '呼吸科', "2021/4/10 9:30", "scheduled"),
    new Record('杭州市第一医院', '消化科', "2021/3/10 11:00", "pending"),
    new Record('浙大医学院附属第一医院', '呼吸科', "2021/2/10 15:50", "done"),
    new Record('杭州市第二医院', '儿科', "2021/1/10 14:20", "done"),
    ];

    return (
        <View >
            <Searchbar placeholder='搜索诊疗记录' onChangeText={onChangeSearch} value={searchQuery} />
            <ScrollView >
                {records.filter((record) => {
                    return (record.hospital.includes(searchQuery) || record.department.includes(searchQuery)
                        || record.date.includes(searchQuery))
                })
                    .map((record, index) => {
                        return (
                                
                              
                                (record.status == "done")?
                                (<List.Item style={style.card} key={record.date} title={record.hospital + ' ' + record.department} 
                                left={props => <List.Icon {...props} icon="chevron-down-circle-outline"/>}
                                right={props =>  <FAB style={style.fab} label="诊疗页面"/>}
                                
                                description={record.date} ></List.Item>)
                                :((record.status == "pending")?
                                (<List.Item style={style.card} key={record.date} title={record.hospital + ' ' + record.department} 
                                left={props => <List.Icon {...props} icon={"briefcase"} />}
                                right={props =>  <FAB style={style.fab} label="诊疗页面"/>}
                                description={record.date}  ></List.Item>)
                                :
                                (<List.Item style={style.card} key={record.date} title={record.hospital + ' ' + record.department} 
                                left={props => <List.Icon {...props} icon="calendar" />}
                                right={props =>  <FAB style={style.fab} label="诊疗页面"/>}
                                description={record.date} ></List.Item>)

                                )
                                    
                               
                                
                
                        )
                    })}
            </ScrollView>
        </View>
    )
}