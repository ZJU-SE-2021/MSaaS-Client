import AsyncStorage from '@react-native-async-storage/async-storage';

const globalContextKey = '@global_context'

export const storeContext = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(globalContextKey, jsonValue)
    } catch (e) {
        throw e
    }
}

export const getContext = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(globalContextKey)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        throw e
    }
}
