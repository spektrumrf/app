import React, { useState, useEffect } from 'react'
import * as WebBrowser from 'expo-web-browser'
import { StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { useFirestore } from '../../hooks/useFirestore'
import { withTheme } from '../../hooks/useTheme'
import { Text, SafeAreaView } from '../../components/Themed'

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
    })

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Fest!</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Root', {
                        screen: 'Activities',
                        params: {
                            screen: 'CalendarScreen'
                        }
                    })
                }}
            >
                <Text>Till Kalender</Text>
            </TouchableOpacity>
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
                <Text>Till Sångbok</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Root', {
                        screen: 'Activities',
                        params: {
                            screen: 'SongArchiveScreen'
                        }
                    })
                }}
            >
                <Text>Till Sångarkiv</Text>
            </TouchableOpacity>
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
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default withTheme(ActivitiesScreen)
