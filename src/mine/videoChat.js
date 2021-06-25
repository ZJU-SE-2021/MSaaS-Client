// import {Appbar, Button} from 'react-native-paper';
// import React, {useContext, useEffect, useState} from "react";
// import {Context} from "../../store/reducer";
// import {StyleSheet, View} from "react-native";
// import {useNavigation} from "@react-navigation/native";
// import { mediaDevices, RTCView } from 'react-native-webrtc';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
//
//
// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     stream: {
//         flex: 1
//     },
//     footer: {
//         backgroundColor: Colors.lighter,
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0
//     },
// });
//
// export default function VideoChat() {
//     const [state, dispatch] = useContext(Context);
//     const navigation = useNavigation()
//
//     const [stream, setStream] = useState(null);
//     const start = async () => {
//         console.log('start');
//         if (!stream) {
//             let s;
//             try {
//                 s = await mediaDevices.getUserMedia({ video: true });
//                 setStream(s);
//             } catch(e) {
//                 console.error(e);
//             }
//         }
//     };
//     const stop = () => {
//         console.log('stop');
//         if (stream) {
//             stream.release();
//             setStream(null);
//         }
//     };
//
//     return (
//         <View style={style.container}>
//             <Appbar.Header>
//                 <Appbar.BackAction onPress={() => {
//                     navigation.goBack()
//                 }}/>
//                 <Appbar.Content title="医生交流" subtitle={state.userProfile.username}/>
//                 <Appbar.Action icon="message-video" onPress={() => {}} />
//             </Appbar.Header>
//             {
//                 stream &&
//                 <RTCView
//                     streamURL={stream.toURL()}
//                     style={style.stream} />
//             }
//             <View
//                 style={style.footer}>
//                 <Button
//                     title = "Start"
//                     onPress = {start} />
//                 <Button
//                     title = "Stop"
//                     onPress = {stop} />
//             </View>
//         </View>
//     )
// }

/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
    Button,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import WebrtcSimple from 'react-native-webrtc-simple';
import {
    globalCall,
    globalCallRef,
    GlobalCallUI,
} from 'react-native-webrtc-simple/UIKit';

const VideoChat = (props) => {
    const [userId, setUserId] = useState(null);
    const [callId, setCallId] = useState('');

    useEffect(() => {
        const configuration = {
            optional: null,
            key: Math.random().toString(36).substr(2, 4),
        };

        globalCall.start(configuration, (sessionId) => {
            setUserId(sessionId);
        });
    }, []);

    const callToUser = (userId) => {
        if (userId.length > 0) {
            const data = {
                sender_name: 'Sender Name',
                sender_avatar:
                    'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
                receiver_name: 'Receiver Name',
                receiver_avatar:
                    'https://www.atlantawatershed.org/wp-content/uploads/2017/06/default-placeholder.png',
            };
            WebrtcSimple.events.call(userId, data);
        } else {
            alert('Please enter userId');
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={{fontSize: 30}}>{userId}</Text>
            </View>

            <View style={styles.rowbtn}>
                <TextInput
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType="default"
                    placeholder="Enter id"
                    onChangeText={(text) => {
                        setCallId(text);
                    }}
                />
                <View style={styles.btn}>
                    <Button
                        title="Call"
                        color={Platform.OS === 'ios' ? 'white' : 'black'}
                        onPress={() => {
                            callToUser(callId);
                        }}
                    />
                </View>
            </View>
            <GlobalCallUI ref={globalCallRef} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowbtn: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        marginVertical: 8,
    },
    btn: {
        margin: 16,
        backgroundColor: 'black',
        paddingHorizontal: 10,
    },
    textInput: {
        width: 200,
        height: 50,
        borderWidth: 0.5,
        borderColor: 'gray',
        paddingHorizontal: 12,
    },
});

export default VideoChat;