import {Appbar, Button, Dialog, Portal, Snackbar, TextInput, ToggleButton} from 'react-native-paper';
import React, {useContext, useEffect, useState} from "react";
import {storeContext} from "../../store/localStorage";
import {Context} from "../../store/reducer";
import {Platform, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import LoadingWrapper from "../components/LoadingWrapper";
import ScreenWrapper from "../components/ScreenWrapper";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Configuration, Gender, UsersApi} from "../../network";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function UserProfile() {
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation()

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('Male');
    const [birthday, setBirthday] = useState(new Date());
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');

    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [showChangePwd, setShowChangePwd] = useState(false);

    function logout() {
        dispatch({type: 'SET_LOGOUT'})
        storeContext({loginState: false}).then()
    }

    function saveInfoEdit() {
        const conf = new Configuration({apiKey: state.jwtToken});
        const userApi = new UsersApi(conf);

        userApi.updateCurrentUser({
            updateUserForm: {
                username: username,
                name: name,
                gender: Gender[gender],
                birthday: birthday,
                phone: phone,
                email: email
            }
        }).then(res => {
            setMessage('个人信息修改成功');
            setShowMessage(true);
            setLoading(false);
        }, reason => {
            setMessage('个人信息修改提交失败');
            setShowMessage(true);
            setLoading(false);
        })
    }

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || birthday;
        setBirthday(currentDate);
    } // ?

    const updatePwd = () => {
        if (pwd !== pwd2) {
            setMessage('两次密码输入不一致');
            setShowMessage(true);
            return;
        }

        if (pwd.length === 0) {
            setMessage('新密码不能为空');
            setShowMessage(true);
            return;
        }

        const conf = new Configuration({apiKey: state.jwtToken});
        const userApi = new UsersApi(conf);

        userApi.updateCurrentUser({
            updateUserForm: {
                username: username,
                name: name,
                gender: Gender[gender],
                birthday: birthday,
                phone: phone,
                email: email,
                password: pwd
            }
        }).then(res => {
            setMessage('密码修改成功');
            setShowMessage(true);
            setShowChangePwd(false);
        }, reason => {
            setMessage('密码修改失败');
            setShowMessage(true);
        })
    }

    useEffect(() => {
        const conf = new Configuration({apiKey: state.jwtToken});
        const userApi = new UsersApi(conf);

        userApi.getCurrentUser().then(res => {
            if (res.username !== undefined) {
                setUsername(res.username);
            }
            if (res.name !== undefined) {
                setName(res.name);
            }
            if (res.birthday !== undefined) {
                setBirthday(res.birthday);
            }
            if (res.gender !== undefined) {
                setGender(res.gender);
            }
            if (res.email !== undefined) {
                setEmail(res.email);
            }
            if (res.phone !== undefined) {
                setPhone(res.phone);
            }
            setLoading(false);
        }, reason => {
            setMessage('获取个人信息失败');
            setShowMessage(true);
            setLoading(false);
        })
    }, [])

    return (
        <View style={style.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }}/>
                <Appbar.Content title="个人信息" subtitle={state.username}/>
            </Appbar.Header>

            <LoadingWrapper isLoading={isLoading}>
                <ScreenWrapper>
                    <TextInput label="姓名" value={name} onChangeText={setName}/>
                    <Text>{"性别"}</Text>
                    <ToggleButton.Row onValueChange={value => setGender(value)} value={gender}>
                        <ToggleButton icon="gender-male" value="Male"/>
                        <ToggleButton icon="gender-female" value="Female"/>
                        <ToggleButton icon="gender-transgender" value="Other"/>
                    </ToggleButton.Row>
                    <Text>{"生日"}</Text>
                    {Platform.OS !== 'web' ?
                        <DateTimePicker testID="dateTimePicker" value={birthday} onChange={onDateChange}
                                        maximumDate={Date.now()}/> :
                        <Text type="datetime-local" value={birthday} onChange={onDateChange}
                              InputLabelProps={{shrink: true}}/>}
                    <TextInput label="手机号码" value={phone} onChangeText={setPhone}/>
                    <TextInput label="邮箱" value={email} onChangeText={setEmail}/>
                    <Button icon="content-save-edit" mode="contained" onPress={saveInfoEdit}>
                        保存个人信息
                    </Button>
                    <Button icon="account-key" mode="contained" onPress={() => setShowChangePwd(true)}>
                        修改密码
                    </Button>
                    <Button icon="logout" mode="contained" onPress={logout}>
                        退出登录
                    </Button>
                </ScreenWrapper>
            </LoadingWrapper>
            <Snackbar
                visible={showMessage}
                onDismiss={() => setShowMessage(false)}
            >
                {message}
            </Snackbar>
            <Portal>
                <Dialog visible={showChangePwd} onDismiss={() => {
                    setShowChangePwd(false)
                }}>
                    <Dialog.Title>修改密码</Dialog.Title>
                    <Dialog.Content>
                        <TextInput label="请输入新密码" value={pwd} onChangeText={setPwd} secureTextEntry/>
                        <TextInput label="请再次输入新密码" value={pwd2} onChangeText={setPwd2} secureTextEntry/>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            setShowChangePwd(false);
                            setPwd('');
                            setPwd2('')
                        }}>
                            取消
                        </Button>
                        <Button onPress={updatePwd}>确认</Button>
                    </Dialog.Actions>
                </Dialog>
                <Snackbar
                    visible={showMessage}
                    onDismiss={() => setShowMessage(false)}
                >
                    {message}
                </Snackbar>
            </Portal>
        </View>
    )
}