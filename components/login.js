import {Appbar, FAB, TextInput} from 'react-native-paper';
import React, {useContext} from "react";
import {View} from "react-native";
import {Context} from "../store/reducer";
import {storeContext} from "../store/localStorage";

function login(state, dispatch) {
    dispatch({type: 'SET_LOGIN', payload: true})
    storeContext({loginState: true}).then()
}

export default function Login() {
    const [text, setText] = React.useState('');
    const [state, dispatch] = useContext(Context);
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="MSaaS" subtitle="智能医疗系统" />
            </Appbar.Header>
            <View>
                <TextInput
                    label="用户名"
                    mode="outlined"
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <TextInput
                    label="密码"
                    mode="outlined"
                    value={text}
                    onChangeText={text => setText(text)}
                />
                <FAB
                    small
                    icon="login"
                    label="登录"
                    onPress={() => login(state, dispatch)}
                />
            </View>
        </View>
    )
}