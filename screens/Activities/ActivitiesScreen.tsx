import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import { withTheme } from '../../hooks/useTheme'
import { Text, View } from '../../components/Themed'

function ActivitiesScreen ({ navigation, theme }) {
    return (
        <View style={styles.container}>
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
                    navigation.navigate('Root', {
                        screen: 'Activities',
                        params: {
                            screen: 'SongBookScreen'
                        }
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
        </View>
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
