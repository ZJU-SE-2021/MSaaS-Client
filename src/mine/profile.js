import {Appbar, Button} from 'react-native-paper';
import React, {useContext} from "react";
import {storeContext} from "../../store/localStorage";
import {Context} from "../../store/reducer";
import {StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default function UserProfile() {
    const [state, dispatch] = useContext(Context);
    const navigation = useNavigation()

    function logout() {
        dispatch({type: 'SET_LOGOUT'})
        storeContext({loginState: false}).then()
    }

    return (
        <View style={style.container}>
            <Appbar.Header >
                <Appbar.BackAction onPress={() => {
                    navigation.goBack()
                }}/>
                <Appbar.Content title="个人信息" subtitle={state.username}/>
            </Appbar.Header>
            <Button icon="logout" mode="contained" onPress={logout}>
                退出登录
            </Button>
        </View>
    )
}