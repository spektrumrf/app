import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, RefreshControl } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import { fetchSongArchive } from '../../api/songArchive'
import { withTheme } from '../../hooks/useTheme'
import { Text, View } from '../../components/Themed'
import Layout from '../../constants/Layout'
import LoadingScreen from '../LoadingScreen'

function SongArchiveScreen ({ theme }) {
    const [songArchive, setSongArchive] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchSongArchive().then(res => {
            setSongArchive(res)
            if (loading) {
                setLoading(false)
            }
            if (refreshing) {
                setRefreshing(false)
            }
        })
    }, [refreshing])

    const decodeHtmlCharCodes = (str: string) =>
        str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
            String.fromCharCode(charCode))

    return (
        <View style={styles.container}>
            {loading
                ? <LoadingScreen/>
                : <FlatList
                    refreshControl={<RefreshControl
                        colors={[theme.primary]}
                        tintColor={theme.primary}
                        refreshing={refreshing}
                        onRefresh={() => setRefreshing(true)} />
                    }
                    data={songArchive}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Card
                            title={item.title}
                            containerStyle={{ backgroundColor: theme.background, ...styles.card }}
                            titleStyle={{ color: theme.text }}
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
                            <Text>{decodeHtmlCharCodes(item.description)}</Text>
                        </Card>
                    )}
                />
            }
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
    },
    row: {
        flexDirection: 'row'
    },
    card: {
        borderRadius: 10,
        width: Layout.window.width - 30
    }
})

export default withTheme(SongArchiveScreen)
