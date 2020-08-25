import React, { useState, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableHighlight, Image, ImageBackground, ScrollView, Alert } from 'react-native'
import { Icon } from 'react-native-elements'

import { useFirestore } from '../../hooks/useFirestore'
import { withTheme } from '../../hooks/useTheme'
import Layout from '../../constants/Layout'
import { Text, View, SafeAreaView } from '../../components/Themed'

const HOMEPAGE_URL = 'https://spektrum.fi'

function HomeScreen ({ navigation, theme }) {
    const firestore = useFirestore()

    const [visit, setVisit] = useState('')
    const [loading, setLoading] = useState(true)
    const [urls, setUrls] = useState({})

    useEffect(() => {
        firestore.collection('home').doc('urls').get().then(res => {
            setUrls(res.data())
            if (loading) {
                setLoading(false)
            }
        })
    }, [])

    const logos = {
        light: require('../../assets/images/logo-black.png'),
        dark: require('../../assets/images/logo-white.png'),
        pink: require('../../assets/images/logo-black.png'),
        tint: require('../../assets/images/logo-pink.png')
    }

    const SocialIcon = ({ name }) => {
        const [state, setState] = useState('')

        return (
            <TouchableHighlight
                activeOpacity={1}
                underlayColor={theme.background}
                onShowUnderlay={() => setState(name)}
                onHideUnderlay={() => setState('')}
                onPress={() => {
                    loading
                        ? Alert.alert(`Laddar ${name} ...`, 'Checka din nätuppkoppling')
                        : WebBrowser.openBrowserAsync(urls[name])
                }}
            >
                <Icon
                    color={state === name ? theme.primary : theme.text}
                    name={name}
                    type='fontisto'
                    size={theme.iconSize}
                />
            </TouchableHighlight>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                style={theme.id === 'dark' ? 'light' : 'dark'}
            />
            <ScrollView>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisit('settings')}
                    onHideUnderlay={() => setVisit('')}
                    style={styles.settings}
                    onPress={() => {
                        navigation.navigate('Root', {
                            screen: 'Home',
                            params: {
                                screen: 'SettingsScreen'
                            }
                        })
                    }}
                >
                    <Icon
                        name='settings'
                        type='feather'
                        size={30}
                        color={visit === 'settings' ? theme.primary : theme.text}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisit('homepage')}
                    onHideUnderlay={() => setVisit('')}
                    onPress={() => { WebBrowser.openBrowserAsync(HOMEPAGE_URL) }}
                >
                    <ImageBackground
                        style={styles.logo}
                        source={logos.tint}>
                        <Image
                            style={{ zIndex: 1, position: 'absolute', ...styles.logo }}
                            source={visit === 'homepage' ? null : logos[theme.id]}
                        />
                    </ImageBackground>
                </TouchableHighlight>
                <Text style={styles.description}>
                    Spektrum rf är en svensk­språkig ämnesförening vid Helsingfors universitets matematisk-naturvetenskapliga fakultet.
                </Text>
                <View style={styles.row}>
                    <SocialIcon name={'whatsapp'} />
                    <SocialIcon name={'facebook'} />
                    <SocialIcon name={'instagram'} />
                </View>
                <View style={styles.row}>
                    <SocialIcon name={'github'} />
                    <SocialIcon name={'discord'} />
                    <SocialIcon name={'spotify'} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    settings: {
        alignItems: 'flex-end',
        paddingTop: 15,
        paddingRight: 15
    },
    logo: {
        width: Layout.window.width,
        height: Layout.window.width
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 30
    },
    description: {
        marginVertical: 30,
        marginHorizontal: 15,
        fontSize: 16,
        textAlign: 'center'
    }
})

export default withTheme(HomeScreen)
