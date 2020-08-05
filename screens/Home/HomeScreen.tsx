import React, { useState } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, TouchableHighlight, Image, ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements'

import { withTheme } from '../../hooks/useTheme'
import Layout from '../../constants/Layout'
import { Text, View, SafeAreaView } from '../../components/Themed'

const HOMEPAGE_URL = 'https://spektrum.fi'
const WHATSAPP_URL = 'https://chat.whatsapp.com/Ku08Q8x7voJ6VojRexYT0F'
const GITHUB_URL = 'https://github.com/spektrumrf'
const FACEBOOK_URL = 'https://www.facebook.com/groups/545974'
const DISCORD_URL = 'https://discord.gg/JKyBHeA'
const SPOTIFY_URL = 'https://open.spotify.com/playlist/7wkSGEKhkyGztLINK37vlv?si=ulKr4CsTQISATz8x4JK1Zg'
const INSTAGRAM_URL = 'https://instagram.com/spektrumrf'

function HomeScreen ({ navigation, theme }) {
    const [visit, setVisit] = useState('')

    const logos = {
        light: require('../../assets/images/logo-black.png'),
        dark: require('../../assets/images/logo-white.png'),
        pink: require('../../assets/images/logo-pink.png')
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                style={theme.id === 'dark' ? 'light' : 'dark'}
            />
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
                    source={logos.pink}>
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
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisit('whatsapp')}
                    onHideUnderlay={() => setVisit('')}
                    onPress={() => { WebBrowser.openBrowserAsync(WHATSAPP_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visit === 'whatsapp' ? theme.primary : theme.text}
                        name='whatsapp'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisit('facebook')}
                    onHideUnderlay={() => setVisit('')}
                    onPress={() => { WebBrowser.openBrowserAsync(FACEBOOK_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visit === 'facebook' ? theme.primary : theme.text}
                        name='facebook'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisit('instagram')}
                    onHideUnderlay={() => setVisit('')}
                    onPress={() => { WebBrowser.openBrowserAsync(INSTAGRAM_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visit === 'instagram' ? theme.primary : theme.text}
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
                    onShowUnderlay={() => setVisit('github')}
                    onHideUnderlay={() => setVisit('')}
                    onPress={() => { WebBrowser.openBrowserAsync(GITHUB_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visit === 'github' ? theme.primary : theme.text}
                        name='github'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisit('discord')}
                    onHideUnderlay={() => setVisit('')}
                    onPress={() => { WebBrowser.openBrowserAsync(DISCORD_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visit === 'discord' ? theme.primary : theme.text}
                        name='discord'
                        type='fontisto'
                        size={theme.iconSize}
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor={theme.background}
                    onShowUnderlay={() => setVisit('spotify')}
                    onHideUnderlay={() => setVisit('')}
                    onPress={() => { WebBrowser.openBrowserAsync(SPOTIFY_URL) }}
                    style={styles.button}
                >
                    <Icon
                        color={visit === 'spotify' ? theme.primary : theme.text}
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

export default withTheme(HomeScreen)
