import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import { fetchLunch } from '../../api/lunch'
import { withTheme } from '../../hooks/useTheme'
import { Text, SafeAreaView, View } from '../../components/Themed'
import Layout from '../../constants/Layout'
import LoadingScreen from '../LoadingScreen'

function LunchScreen ({ theme }) {
    const [lunch, setLunch] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchLunch().then(res => {
            setLunch(res)
            if (loading) {
                setLoading(false)
            }
        })
    }, [])

    const formatFood = (food: any) => {
        return food.map((x, i) => {
            return <View style={styles.row} key={i}>{
                x.map(y => {
                    if (y.toLowerCase().includes('tiedoitus')) {
                        return <Icon
                            key={0}
                            style={{ paddingRight: 5 }}
                            color={theme.text}
                            name='info-outline'
                            type='materialicons'
                            size={18}
                        />
                    } else if (y.toLowerCase().includes('päivän lounas')) {
                        return <Icon
                            key={0}
                            style={{ paddingRight: 5 }}
                            color={theme.text}
                            name='restaurant-menu'
                            type='ionicons'
                            size={18}
                        />
                    } else if (y.toLowerCase().includes('allergeenit')) {
                        return <Icon
                            key={0}
                            style={{ paddingRight: 9 }}
                            color={theme.text}
                            name='allergies'
                            type='font-awesome-5'
                            size={15}
                        />
                    } else if (x[0].toLowerCase().includes('päivän lounas')) {
                        return <Text style={{ flexShrink: 1, fontWeight: 'bold' }} key={i}>{y}</Text>
                    } else {
                        return <Text style={{ flexShrink: 1 }} key={1}>{y}</Text>
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
                                    ? <View>{formatFood(item.food)}</View>
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
