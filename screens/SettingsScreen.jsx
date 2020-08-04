import React, { useEffect, useState } from 'react'
import { StyleSheet, Switch } from 'react-native'
import * as WebBrowser from 'expo-web-browser'

import { useTheme } from '../hooks/useTheme'
import Layout from '../constants/Layout'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import { View, Text } from '../components/Themed'

const REPOSITORY_URL = 'https://github.com/spektrumrf/app'

export default function SettingsScreen ({ route }) {
    const { mode, theme, toggle } = useTheme()
    const colorScheme = useColorScheme()

    const [light, setLight] = useState(mode === 'light')
    const [dark, setDark] = useState(mode === 'dark')
    const toggleTheme = () => {
        setLight(!light)
        setDark(!dark)
        toggle()
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Tema
            </Text>
            <View style={styles.toggle}>
                <Text>
                    Ljus
                </Text>
                <Switch
                    trackColor={{ false: theme.idleSecondary, true: theme.secondary }}
                    thumbColor={light ? theme.primary : theme.idle}
                    onValueChange={toggleTheme}
                    value={light}
                />
            </View>
            <View style={styles.toggle}>
                <Text>
                    Mörk
                </Text>
                <Switch
                    trackColor={{ false: theme.idleSecondary, true: theme.secondary }}
                    thumbColor={dark ? theme.primary : theme.idle}
                    onValueChange={toggleTheme}
                    value={dark}
                />
            </View>
            <Text style={styles.title}>
                Om
            </Text>
            <Text
                style={{ color: theme.primary }}
                onPress={() => { WebBrowser.openBrowserAsync(REPOSITORY_URL) }}
            >
                https://github.com/spektrumrf/app
            </Text>
            <Text>
                © Daniel Holmberg, 2020
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})
