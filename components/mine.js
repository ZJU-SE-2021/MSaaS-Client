import {Appbar, Button} from 'react-native-paper';
import React, {useContext} from "react";
import {storeContext} from "../store/localStorage";
import {Context} from "../store/reducer";
import {View} from "react-native";

function logout(state, dispatch) {
    dispatch({type: 'SET_LOGIN', payload: false})
    storeContext({loginState: false}).then()
}

export default function Mine() {
    const [state, dispatch] = useContext(Context);
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="我的" subtitle="MSaaS"/>
            </Appbar.Header>
            <Button icon="logout" mode="contained" onPress={() => logout(state, dispatch)}>
                退出登录
            </Button>
        </View>
    )
}