import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Card } from 'react-native-elements'

import LoadingScreen from '../LoadingScreen'
import { withTheme } from '../../hooks/useTheme'
import { useCalendar } from '../../hooks/useCalendar'
import { Text, SafeAreaView } from '../../components/Themed'

function CalendarScreen ({ theme }) {
    const [calendar, setCalendar] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        useCalendar().then(res => {
            setCalendar(res)
            if (loading) {
                setLoading(false)
            }
        })
    })
    return (
        loading ? <LoadingScreen/>
            : <SafeAreaView style={styles.container}>
                <Text>Spektrums Händelsekalender!</Text>
                <FlatList
                    data={calendar}
                    keyExtractor={item => item.date}
                    renderItem={({ item }) => (
                        <Card
                            title={item.event}
                            containerStyle={{ borderRadius: 10, backgroundColor: theme.background }}
                            titleStyle={{
                                color: theme.text
                            }}
                        >
                            <Text>{item.date}</Text>
                        </Card>
                    )}
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
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default withTheme(CalendarScreen)
