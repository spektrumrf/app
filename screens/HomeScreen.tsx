import React, { useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableHighlight, Image, ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements'

import { useTheme } from '../hooks/useTheme'
import Layout from '../constants/Layout'
import { Text, View, SafeAreaView } from '../components/Themed'

const HOMEPAGE_URL = 'https://spektrum.fi'
const WHATSAPP_URL = 'https://chat.whatsapp.com/Ku08Q8x7voJ6VojRexYT0F'
const GITHUB_URL = 'https://github.com/spektrumrf'
const FACEBOOK_URL = 'https://www.facebook.com/groups/545974'
const DISCORD_URL = 'https://discord.gg/JKyBHeA'
const SPOTIFY_URL = 'https://open.spotify.com/playlist/7wkSGEKhkyGztLINK37vlv?si=ulKr4CsTQISATz8x4JK1Zg'
const INSTAGRAM_URL = 'https://instagram.com/spektrumrf'

export default function HomeScreen ({ navigation }) {
    const { mode, theme } = useTheme()

    const [visitHomepage, setVisitHomepage] = useState(false)
    const [visitSettings, setVisitSettings] = useState(false)
    const [visitWhatsapp, setVisitWhatsapp] = useState(false)
    const [visitFacebook, setVisitFacebook] = useState(false)
    const [visitInstagram, setVisitInstagram] = useState(false)
    const [visitGithub, setVisitGithub] = useState(false)
    const [visitDiscord, setVisitDiscord] = useState(false)
    const [visitSpotify, setVisitSpotify] = useState(false)

    const logos = {
        light: require('../assets/images/logo-black.png'),
        dark: require('../assets/images/logo-white.png'),
        pink: require('../assets/images/logo-pink.png')
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                style={mode === 'dark' ? 'light' : 'dark'}
            />
            <TouchableHighlight
                activeOpacity={1}
                underlayColor={theme.background}
                onShowUnderlay={() => setVisitSettings(true)}
                onHideUnderlay={() => setVisitSettings(false)}
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
                    color={visitSettings ? theme.primary : theme.text}
                />
            </TouchableHighlight>
            <TouchableHighlight
                activeOpacity={1}
                underlayColor={theme.background}
                onShowUnderlay={() => setVisitHomepage(true)}
                onHideUnderlay={() => setVisitHomepage(false)}
                onPress={() => { WebBrowser.openBrowserAsync(HOMEPAGE_URL) }}
            >
                <ImageBackground
                    style={styles.logo}
                    source={logos.pink}>
                    <Image
                        style={{ zIndex: 1, position: 'absolute', ...styles.logo }}
                        source={visitHomepage ? null : logos[mode]}
                    />
                </ImageBackground>
            </TouchableHighlight>
            <Text style={styles.description}>
                Spektrum rf är en svensk­språkig ämnesförening vid Helsingfors universitets matematisk-naturvetenskapliga fakultet.
            </Text>
            <View style={styles.row}>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisitWhatsapp(true)}
                    onHideUnderlay={() => setVisitWhatsapp(false)}
                    onPress={() => { WebBrowser.openBrowserAsync(WHATSAPP_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visitWhatsapp ? theme.primary : theme.text}
                        name='whatsapp'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisitFacebook(true)}
                    onHideUnderlay={() => setVisitFacebook(false)}
                    onPress={() => { WebBrowser.openBrowserAsync(FACEBOOK_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visitFacebook ? theme.primary : theme.text}
                        name='facebook'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisitInstagram(true)}
                    onHideUnderlay={() => setVisitInstagram(false)}
                    onPress={() => { WebBrowser.openBrowserAsync(INSTAGRAM_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visitInstagram ? theme.primary : theme.text}
                        name='instagram'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
            </View>
            <View style={styles.row}>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisitGithub(true)}
                    onHideUnderlay={() => setVisitGithub(false)}
                    onPress={() => { WebBrowser.openBrowserAsync(GITHUB_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visitGithub ? theme.primary : theme.text}
                        name='github'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisitDiscord(true)}
                    onHideUnderlay={() => setVisitDiscord(false)}
                    onPress={() => { WebBrowser.openBrowserAsync(DISCORD_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visitDiscord ? theme.primary : theme.text}
                        name='discord'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisitSpotify(true)}
                    onHideUnderlay={() => setVisitSpotify(false)}
                    onPress={() => { WebBrowser.openBrowserAsync(SPOTIFY_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visitSpotify ? theme.primary : theme.text}
                        name='spotify'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
            </View>
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
        marginVertical: 15
    },
    button: {
        paddingTop: 15
    },
    description: {
        marginVertical: 30,
        marginHorizontal: 15,
        fontSize: 16,
        textAlign: 'center'
    }
})
