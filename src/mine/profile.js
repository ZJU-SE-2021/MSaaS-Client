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
    textBar: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
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
            setMessage('????????????????????????');
            setShowMessage(true);
            setLoading(false);
        }, reason => {
            setMessage('??????????????????????????????');
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
            setMessage('???????????????????????????');
            setShowMessage(true);
            return;
        }

        if (pwd.length === 0) {
            setMessage('?????????????????????');
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
            setMessage('??????????????????');
            setShowMessage(true);
            setShowChangePwd(false);
        }, reason => {
            setMessage('??????????????????');
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
            setMessage('????????????????????????');
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
                <Appbar.Content title="????????????" subtitle={state.username}/>
                <Appbar.Action icon="logout" onPress={logout} />
            </Appbar.Header>

            <LoadingWrapper isLoading={isLoading}>
                <ScreenWrapper>
                    <TextInput label="??????" value={name} style={style.textBar} onChangeText={setName}/>
                    <Text style={style.textBar}>{"??????"}</Text>
                    <ToggleButton.Row style={style.textBar} onValueChange={value => setGender(value)} value={gender}>
                        <ToggleButton icon="gender-male" value="Male"/>
                        <ToggleButton icon="gender-female" value="Female"/>
                        <ToggleButton icon="gender-transgender" value="Other"/>
                    </ToggleButton.Row>
                    <Text style={style.textBar}>{"??????"}</Text>
                    {Platform.OS !== 'web' ?
                        <DateTimePicker style={style.textBar} testID="dateTimePicker" value={birthday} onChange={onDateChange}
                                        maximumDate={Date.now()}/> :
                        <Text style={style.textBar} type="datetime-local" value={birthday} onChange={onDateChange}
                              InputLabelProps={{shrink: true}}/>}
                    <TextInput style={style.textBar} label="????????????" value={phone} onChangeText={setPhone}/>
                    <TextInput style={style.textBar} label="??????" value={email} onChangeText={setEmail}/>
                    <Button style={style.textBar} icon="content-save-edit" mode="contained" onPress={saveInfoEdit}>
                        ??????????????????
                    </Button>
                    <Button style={style.textBar} icon="account-key" mode="contained" onPress={() => setShowChangePwd(true)}>
                        ????????????
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
                    <Dialog.Title>????????????</Dialog.Title>
                    <Dialog.Content>
                        <TextInput label="??????????????????" value={pwd} onChangeText={setPwd} secureTextEntry/>
                        <TextInput label="????????????????????????" value={pwd2} onChangeText={setPwd2} secureTextEntry/>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            setShowChangePwd(false);
                            setPwd('');
                            setPwd2('')
                        }}>
                            ??????
                        </Button>
                        <Button onPress={updatePwd}>??????</Button>
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