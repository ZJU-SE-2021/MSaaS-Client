import {Appbar, Avatar, Caption, FAB, Snackbar, TextInput, Title} from 'react-native-paper';
import React, {useContext, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Context} from "../store/reducer";
import {storeContext} from "../store/localStorage";
import {UsersApi} from '../network'
import DialogWithLoadingIndicator from "./components/Dialog";

const style = StyleSheet.create({
    outerView: {
        alignItems: 'center',
        padding: 30,
        width: '100%',
    },
    textBar: {
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        maxWidth: 400,
    },
    button: {
        marginTop: 20,
    },
    title: {
        fontSize: 30,
        paddingTop: 20,
        paddingBottom: 10,
    },
    caption: {
        fontSize: 18,
    },
    container: {
        flex: 1,
    },
});

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')

    const [state, dispatch] = useContext(Context)
    const userApi = new UsersApi()

    async function handleLogin() {
        setLoading(true)
        const loginForm = {username, password}
        try {
            const res = await userApi.login({loginForm})
            res.token = `Bearer ${res.token}`
            dispatch({type: 'SET_LOGIN', payload: res})
            storeContext({
                loginState: true,
                userProfile: res.user,
                jwtToken: res.token
            }).then()
        } catch (e) {
            setMessage('登录失败，请检查用户名、密码、网络')
            setShowMessage(true)
            setLoading(false)
        }
    }

    return (
        <View style={style.container}>
            <Appbar.Header>
                <Appbar.Content title="MSaaS" subtitle="智能医疗系统"/>
            </Appbar.Header>
            <DialogWithLoadingIndicator
                visible={isLoading}
                close={() => setLoading(false)}
                title={'请稍候'}
                content={'正在登录...'}
            />
            <View style={style.outerView}>
                <Avatar.Icon size={128} icon="account"/>
                <Title style={style.title}>登录</Title>
                <Caption style={style.caption}>请输入您的用户名和密码</Caption>
                <View style={style.textBar}>
                    <TextInput
                        label="用户名"
                        mode="flat"
                        value={username}
                        left={<TextInput.Icon name='account'/>}
                        onChangeText={setUsername}
                    />
                </View>
                <View style={style.textBar}>
                    <TextInput
                        label="密码"
                        mode="flat"
                        value={password}
                        left={<TextInput.Icon name='key'/>}
                        right={<TextInput.Icon name='eye' onPress={() => {
                            setShowPassword(!showPassword)
                        }}/>}
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={{flexDirection: "row"}}>
                    <FAB
                        style={style.button}
                        icon="login"
                        label="登录"
                        onPress={() => handleLogin()}
                    />
                    <View style={{width: 20}}/>
                    <FAB
                        style={style.button}
                        icon="form-select"
                        label="注册"
                        onPress={() => {
                            setMessage('请前往 https://msaas.app.ncj.wiki 进行注册')
                            setShowMessage(true)
                        }}
                    />
                </View>

            </View>
            <Snackbar
                visible={showMessage}
                onDismiss={() => setShowMessage(false)}
            >
                {message}
            </Snackbar>
        </View>
    )
}