import {Appbar} from 'react-native-paper';
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../store/reducer";
import {StyleSheet, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {GiftedChat} from "react-native-gifted-chat";
import * as signalR from '@microsoft/signalr'
import uuid from "../../utils/uuid";
import WebrtcSimple from 'react-native-webrtc-simple';
import {
    globalCall,
    globalCallRef,
    GlobalCallUI,
} from 'react-native-webrtc-simple/UIKit';


const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function DoctorChat() {
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation()
    const route = useRoute()

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
            AppointmentId: route.params.appointmentId,
            Message: messages[0].text
        })
            .then()
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        const configuration = {
            optional: {
                host: 'msaas.app.ncj.wiki',
                secure: true,
                path: '/peerjs',
                key: 'msaas_peerjs'
            },
            key: `User_${route.params.appointmentId}`,
        };

        globalCall.start(configuration, (sessionId) => {
            console.log(sessionId);
        });
    }, []);

    const callToUser = (userId) => {
        if (userId.length > 0) {
            const data = {
                sender_name: 'Sender Name',
                sender_avatar:
                    'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
                receiver_name: route.params.doctorName,
                receiver_avatar:
                    'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
            };
            WebrtcSimple.events.call(userId, data);
        } else {
            alert('Please enter userId');
        }
    };

    return (
        <View style={style.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }}/>
                <Appbar.Content title="医生交流" subtitle={route.params.doctorName}/>
                <Appbar.Action icon="message-video" onPress={() => callToUser(`Physician_${route.params.appointmentId}`)} />
            </Appbar.Header>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            <GlobalCallUI ref={globalCallRef} />
        </View>
    )
}