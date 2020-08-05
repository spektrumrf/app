import { AsyncStorage } from 'react-native'

export async function retrieveData (key: string) {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value !== null) {
            return value
        }
    } catch (error) {
        return null
    }
}

export async function storeData (key: string, value: string) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.log('error storing data')
    }
}
