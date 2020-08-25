import React, { useState } from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { RadioButton } from 'react-native-paper'

import { withTheme, getThemeId } from '../../hooks/useTheme'
import { View, Text } from '../../components/Themed'

const REPOSITORY_URL = 'https://github.com/spektrumrf/app'

type Underline = 'underline' | 'none' | 'line-through' | 'underline line-through'
type ThemeId = 'light' | 'dark' | 'pink' | 'standard'

function SettingsScreen ({ theme, setTheme }) {
    const [underline, setUnderline] = useState<Underline>('underline')
    const [checked, setChecked] = useState<ThemeId>(getThemeId())
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Tema
            </Text>
            <View style={styles.toggle}>
                <Text>
                    Ljus
                </Text>
                <RadioButton
                    value='light'
                    status={ checked === 'light' ? 'checked' : 'unchecked' }
                    onPress={() => {
                        setTheme('light')
                        setChecked('light')
                    }}
                    color={theme.primary}
                    uncheckedColor={theme.idle}
                />
            </View>
            <View style={styles.toggle}>
                <Text>
                    Mörk
                </Text>
                <RadioButton
                    value='dark'
                    status={ checked === 'dark' ? 'checked' : 'unchecked' }
                    onPress={() => {
                        setTheme('dark')
                        setChecked('dark')
                    }}
                    color={theme.primary}
                    uncheckedColor={theme.idle}
                />
            </View>
            <View style={styles.toggle}>
                <Text>
                    Rosa
                </Text>
                <RadioButton
                    value='pink'
                    status={ checked === 'pink' ? 'checked' : 'unchecked' }
                    onPress={() => {
                        setTheme('pink')
                        setChecked('pink')
                    }}
                    color={theme.primary}
                    uncheckedColor={theme.idle}
                />
            </View>
            <View style={styles.toggle}>
                <Text>
                    Standard
                </Text>
                <RadioButton
                    value='standard'
                    status={ checked === 'standard' ? 'checked' : 'unchecked' }
                    onPress={() => {
                        setTheme('standard')
                        setChecked('standard')
                    }}
                    color={theme.primary}
                    uncheckedColor={theme.idle}
                />
            </View>
            <Text style={styles.title}>
                Om
            </Text>
            <TouchableHighlight
                activeOpacity={1}
                underlayColor={theme.background}
                onShowUnderlay={() => setUnderline('none')}
                onHideUnderlay={() => setUnderline('underline')}
                onPress={() => { WebBrowser.openBrowserAsync(REPOSITORY_URL) }}
            >
                <Text
                    style={{ color: theme.primary, textDecorationLine: underline }}
                >
                    {REPOSITORY_URL}
                </Text>
            </TouchableHighlight>
            <Text>
                © Daniel Holmberg, 2020
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15
    },
    title: {
        fontSize: 16,
        paddingBottom: 10,
        fontWeight: 'bold',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default withTheme(SettingsScreen)
