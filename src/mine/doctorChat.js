import {Appbar} from 'react-native-paper';
import React, {useCallback, useContext, useState} from "react";
import {Context} from "../../store/reducer";
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {GiftedChat} from "react-native-gifted-chat";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function DoctorChat() {
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation()

    const [messages, setMessages] = useState([])

    const onSend = useCallback((messages = []) => {
        console.log(messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <View style={style.container}>
            <Appbar.Header >
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