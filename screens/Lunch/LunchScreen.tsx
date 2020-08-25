import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, RefreshControl } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import { fetchLunch } from '../../api/lunch'
import { withTheme } from '../../hooks/useTheme'
import { Text, SafeAreaView, View } from '../../components/Themed'
import Layout from '../../constants/Layout'
import LoadingScreen from '../LoadingScreen'

function LunchScreen ({ theme }) {
    const [lunch, setLunch] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    useEffect(() => {
        fetchLunch().then(res => {
            setLunch(res)
            if (loading) {
                setLoading(false)
            }
            if (refreshing) {
                setRefreshing(false)
            }
        })
    }, [refreshing])

    const formatLunch = (lunch: any) => {
        const lunchTypes = ['päivän lounas', 'makeasti', 'vegaani', 'erikoinen']

        return lunch.map((x, i) => {
            return <View style={styles.row} key={i}>{
                x.map((y, j) => {
                    if (x[1] == '.') {
                        return
                    } else if (y.toLowerCase().includes('tiedoitus')) {
                        return <Icon
                            key={j}
                            style={{ paddingRight: 5 }}
                            color={theme.text}
                            name='info-outline'
                            type='materialicons'
                            size={18}
                        />
                    } else if (y.toLowerCase().includes('päivän lounas')) {
                        return <Icon
                            key={j}
                            style={{ paddingRight: 5 }}
                            color={theme.text}
                            name='restaurant-menu'
                            type='ionicons'
                            size={18}
                        />
                    } else if (y.toLowerCase().includes('makeasti')) {
                        return <Icon
                            key={j}
                            style={{ paddingRight: 5 }}
                            color={theme.text}
                            name='cupcake'
                            type='material-community'
                            size={18}
                        />
                    } else if (y.toLowerCase().includes('vegaani')) {
                        return <Icon
                            key={j}
                            style={{ paddingRight: 5 }}
                            color={theme.text}
                            name='leaf'
                            type='entypo'
                            size={18}
                        />
                    } else if (y.toLowerCase().includes('erikoinen')) {
                        return <Icon
                            key={j}
                            style={{ paddingRight: 5 }}
                            color={theme.text}
                            name='credit'
                            type='entypo'
                            size={18}
                        />
                    } else if (y.toLowerCase().includes('allergeenit')) {
                        return <Text style={{ paddingRight: 24 }} key={j}>{''}</Text>
                    } else if (lunchTypes.some(lunchType => x[0].toLowerCase().includes(lunchType))) {
                        return <Text style={{ flexShrink: 1, fontWeight: 'bold' }} key={j}>{y}</Text>
                    } else {
                        return <Text style={{ flexShrink: 1 }} key={j}>{y}</Text>
                    }
                })
            }</View>
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading
                ? <LoadingScreen/>
                : <FlatList
                    refreshControl={<RefreshControl
                        colors={[theme.primary]}
                        tintColor={theme.primary}
                        refreshing={refreshing}
                        onRefresh={() => setRefreshing(true)} />
                    }
                    data={lunch}
                    keyExtractor={item => item.id.toString()}
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
                            {
                                item.food.length > 1
                                    ? <View>{formatLunch(item.food)}</View>
                                    : <Text >{item.food}</Text>
                            }
                        </Card>
                    )}
                />
            }
        </SafeAreaView>
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

export default withTheme(LunchScreen)
