import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Icon } from 'react-native-elements'

import LoadingScreen from '../LoadingScreen'
import { withTheme } from '../../hooks/useTheme'
import { fetchCalendar } from '../../api/calendar'
import { Text, View, Card } from '../../components/Themed'

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
            : <View>
                <FlatList
                    data={calendar}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card
                            title={item.event}
                            titleStyle={{
                                color: theme.text
                            }}
                        >
                            <View style={styles.row}>
                                <Icon
                                    style={{ paddingRight: 5 }}
                                    color={theme.text}
                                    name='date-range'
                                    type='materialicons'
                                    size={18}
                                />
                                <Text>{item.date}</Text>
                            </View>
                        </Card>
                    )}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row'
    }
})

export default withTheme(CalendarScreen)
