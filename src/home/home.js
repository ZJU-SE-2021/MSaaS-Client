import {Appbar, Card} from 'react-native-paper';
import {StyleSheet, View, Text} from "react-native";
import React from "react";

class Rx {
    constructor(rxName, timesPerDay, volumePerTime) {
        this.rxName = rxName
        this.timesPerDay = timesPerDay
        this.volumePerTime = volumePerTime
    }
}

const style = StyleSheet.create({
    greeting : {
        padding : 10,
        margin : 10,
        fontSize : 20
    },
    cards : {
        marginBottom : 10,
        marginHorizontal : 10,
    },
    rxList : {
        flexDirection : 'row'
    },
    rxUsage : {
        position : 'absolute',
        right : 0
    }
})

export default function Home() {
    const appointment = {
        time : new Date("2021/6/25 9:30"),
        doctor : "王医生",
        hospital : "杭州市综合医院",
        department : "呼吸科"
    }

    const prescription = {
        doctor : "王医生",
        rxes : [new Rx("伪麻黄碱", 3, "1粒"), new Rx("对乙酰氨基酚", 2, "1粒"), new Rx("氨溴索口服液", 2, "10mL")],
        comment : "避免过度劳累，避免辛辣食品，推荐户外运动。"
    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="MSaaS" subtitle="智能医疗系统"/>
            </Appbar.Header>
            <View>
                <Text style={ style.greeting }>早上好，小明</Text>
            </View>
            <Card style={ style.cards }>
                <Card.Title title="智能诊疗" subtitle="快速为您推荐合适的诊疗方案。"/>
            </Card>
            <Card style={ style.cards }>
                <Card.Title title={ parseInt((appointment.time - (new Date())) / (24*3600*1000)) + '天后的诊疗预约' }/>
                <Card.Content>
                    <Text>{ appointment.doctor }</Text>
                    <Text>{ appointment.time.toLocaleString('zh-CN', { hour12 : false }) }</Text>
                    <Text>{ appointment.hospital + ' | ' + appointment.department }</Text>
                </Card.Content>
            </Card>
            <Card style={ style.cards }>
                <Card.Title title={ prescription.doctor + '开具的处方' }/>
                <Card.Content>
                    { prescription.rxes.map((rx, index) => {
                        return (
                            <View key={ index } style={ style.rxList }>
                                <Text>{ rx.rxName }</Text>
                                <Text style={ style.rxUsage }>{ ' 1日' + rx.timesPerDay + '次，1次' + rx.volumePerTime }</Text>
                            </View>
                        )
                    }) }
                </Card.Content>
            </Card>
            <Card style={ style.cards }>
                <Card.Title title={ prescription.doctor + '的医嘱' }/>
                <Card.Content>
                    <Text>{ prescription.comment }</Text>
                </Card.Content>
            </Card>
        </View>
    )
}