import {Appbar, Button} from 'react-native-paper';
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../../store/reducer";
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { mediaDevices, RTCView } from 'react-native-webrtc';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    stream: {
        flex: 1
    },
    footer: {
        backgroundColor: Colors.lighter,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
});

export default function VideoChat() {
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation()

    const [stream, setStream] = useState(null);
    const start = async () => {
        console.log('start');
        if (!stream) {
            let s;
            try {
                s = await mediaDevices.getUserMedia({ video: true });
                setStream(s);
            } catch(e) {
                console.error(e);
            }
        }
    };
    const stop = () => {
        console.log('stop');
        if (stream) {
            stream.release();
            setStream(null);
        }
    };

    return (
        <View style={style.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }}/>
                <Appbar.Content title="医生交流" subtitle={state.userProfile.username}/>
                <Appbar.Action icon="message-video" onPress={() => {}} />
            </Appbar.Header>
            {
                stream &&
                <RTCView
                    streamURL={stream.toURL()}
                    style={style.stream} />
            }
            <View
                style={style.footer}>
                <Button
                    title = "Start"
                    onPress = {start} />
                <Button
                    title = "Stop"
                    onPress = {stop} />
            </View>
        </View>
    )
}