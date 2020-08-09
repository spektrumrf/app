import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Card } from 'react-native-elements'

import LoadingScreen from '../LoadingScreen'
import { withTheme } from '../../hooks/useTheme'
import { fetchCalendar } from '../../api/calendar'
import { Text, View } from '../../components/Themed'

function CalendarScreen ({ theme }) {
    const [calendar, setCalendar] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCalendar().then(res => {
            setCalendar(res)
            if (loading) {
                setLoading(false)
            }
        })
    }, [])
    return (
        loading ? <LoadingScreen/>
            : <View style={styles.container}>
                <FlatList
                    data={calendar}
                    keyExtractor={item => item.id.toString()}
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
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default withTheme(CalendarScreen)
