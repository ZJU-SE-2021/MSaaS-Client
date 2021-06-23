import {Appbar} from 'react-native-paper';
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../store/reducer";
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {GiftedChat} from "react-native-gifted-chat";
import * as signalR from '@microsoft/signalr'
import uuid from "../../utils/uuid";


const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function DoctorChat() {
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation()

    const [messages, setMessages] = useState([])

    const [connection, setConnection] = useState(null)

    useEffect(() => {
        const _connection = new signalR.HubConnectionBuilder()
            .withUrl("https://msaas.app.ncj.wiki/api/hubs/chat", { accessTokenFactory: () => state.jwtToken.split(' ')[1] })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Debug)
            .build();
        setConnection(_connection)

        _connection
            .start()
            .then(() => console.log('Connection started!'))
            .catch(err => console.log('Error while establishing connection', err));
        _connection.on('ReceiveMessage', ({appointmentId, message, time}) => {
            setMessages(previousMessages => GiftedChat.append(previousMessages, [{
                _id: uuid(),
                createdAt: time,
                text: message,
                user: {
                    _id: 2,
                    name: '医生',
                    avatar: 'https://placeimg.com/140/140/people',
                }
            }]))
        });
    }, [])

    const onSend = (messages = []) => {
        console.log(messages[0].text)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        connection.invoke("SendMessageToPhysician", {
            AppointmentId: 1,
            Message: messages[0].text
        })
            .then()
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <View style={style.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }}/>
                <Appbar.Content title="医生交流" subtitle={state.username}/>
            </Appbar.Header>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </View>
    )
}