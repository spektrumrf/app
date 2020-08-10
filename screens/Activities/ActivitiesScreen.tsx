import React, { useState, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Button, Icon } from 'react-native-elements'

import { useFirestore } from '../../hooks/useFirestore'
import { withTheme } from '../../hooks/useTheme'
import { SafeAreaView } from '../../components/Themed'
import Layout from '../../constants/Layout'

function ActivitiesScreen ({ navigation, theme }) {
    const firestore = useFirestore()

    const [songbook, setSongbook] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        firestore.collection('activities').doc('songbook').get().then(res => {
            setSongbook(res.data().url)
            if (loading) {
                setLoading(false)
            }
        })
    }, [])

    const ActivityButton = ({ onPress, title, name }) => {
        return (
            <Button
                onPress={onPress}
                title={title}
                titleStyle={{ color: theme.background, ...styles.title }}
                buttonStyle={{ backgroundColor: theme.primary, ...styles.button }}
                icon={
                    <Icon
                        name={name}
                        type='font-awesome'
                        size={30}
                        color={theme.background}
                    />
                }
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    loading
                        ? Alert.alert('Laddar Sångboken ...', 'Checka din nätuppkoppling')
                        : WebBrowser.openBrowserAsync(songbook, {
                            enableBarCollapsing: false,
                            toolbarColor: theme.background
                        })
                }}
            >
            </TouchableOpacity>
            <ActivityButton
                onPress={() => {
                    loading
                        ? Alert.alert('Laddar Sångboken ...', 'Checka din nätuppkoppling')
                        : WebBrowser.openBrowserAsync(songbook, {
                            enableBarCollapsing: false,
                            toolbarColor: theme.background
                        })
                }}
                title={'Sångbok'}
                name={'book'}
            />
            <ActivityButton
                onPress={() => {
                    navigation.navigate('Root', {
                        screen: 'Activities',
                        params: {
                            screen: 'SongArchiveScreen'
                        }
                    })
                }}
                title={'Sångarkiv'}
                name={'archive'}
            />
            <ActivityButton
                onPress={() => {
                    navigation.navigate('Root', {
                        screen: 'Activities',
                        params: {
                            screen: 'CalendarScreen'
                        }
                    })
                }}
                title={'Händelsekalendern'}
                name={'calendar'}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    button: {
        width: Layout.window.width - 30,
        height: Layout.window.height / 4,
        marginVertical: 15
    }
})

export default withTheme(ActivitiesScreen)
