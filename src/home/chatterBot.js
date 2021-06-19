import React, {useState, useCallback, useEffect} from 'react'
import {GiftedChat} from 'react-native-gifted-chat'
import {Appbar} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";

export function ChatterBot() {
    const navigation = useNavigation()
    const [messages, setMessages] = useState([])

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: '你好，我是 MSaaS 智能诊疗机器人，你可以问我这些问题：\n“发烧是什么病”\n“感冒有什么症状”\n“感冒多久才能好”',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'MSaaS Bot',
                    avatar: 'https://placeimg.com/140/140/tech',
                },
            },
        ])
    }, [])

    function uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const onSend = useCallback((messages = []) => {
        console.log(messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        fetch(`https://msaas.app.ncj.wiki/api/chatterbot?question=${messages[0].text}`)
            .then((response) => response.json())
            .then((json) => {
                setMessages(previousMessages => GiftedChat.append(previousMessages, [{
                    _id: uuid(),
                    createdAt: Date.now(),
                    text: json.answer,
                    user: {
                        _id: 2,
                        name: 'MSaaS Bot',
                        avatar: 'https://placeimg.com/140/140/tech',
                    }
                }]))
            })
            .catch((error) => {
                console.error(error);
            });
    }, [])

    return (
        <>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }}/>
                <Appbar.Content title="智能诊疗机器人" subtitle='MSaaS'/>
            </Appbar.Header>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        </>

    )
}
