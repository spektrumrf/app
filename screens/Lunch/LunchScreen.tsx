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

    function formatMenu ({ menu }) {
        function FormattedLunch ({ lunch, index, name, type, bold }) {
            return (
                <View style={styles.row} key={index}>
                    <Icon
                        key={'icon'}
                        style={{ paddingRight: 5 }}
                        color={theme.text}
                        name={name}
                        type={type}
                        size={18}
                    />
                    <Text
                        key={'content'}
                        style={{ flexShrink: 1, fontWeight: bold ? 'bold' : 'normal' }}
                    >
                        {lunch.content}
                    </Text>
                </View>
            )
        }

        return menu.map((lunch: {type: string, content: string}, index: number) => {
            if (lunch.content === '.') {
                return null
            } else if (lunch.type.toLowerCase().includes('tiedoitus')) {
                return <FormattedLunch
                    lunch={lunch}
                    name={'info-outline'}
                    type={'materialicons'}
                    bold={false}
                    index
                />
            } else if (lunch.type.toLowerCase().includes('päivän lounas')) {
                return <FormattedLunch
                    lunch={lunch}
                    name={'restaurant-menu'}
                    type={'ionicons'}
                    bold={true}
                    index
                />
            } else if (lunch.type.toLowerCase().includes('makeasti')) {
                return <FormattedLunch
                    lunch={lunch}
                    name={'cupcake'}
                    type={'material-community'}
                    bold={true}
                    index
                />
            } else if (lunch.type.toLowerCase().includes('vegaani')) {
                return <FormattedLunch
                    lunch={lunch}
                    name={'leaf'}
                    type={'entypo'}
                    bold={true}
                    index
                />
            } else if (lunch.type.toLowerCase().includes('erikoinen')) {
                return <FormattedLunch
                    lunch={lunch}
                    name={'credit'}
                    type={'entypo'}
                    bold={true}
                    index
                />
            } else if (lunch.type.toLowerCase().includes('allergeenit')) {
                return <Text style={{ paddingLeft: 24 }} key={index}>
                    {lunch.content}
                </Text>
            }
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
                                item.menu.length > 1
                                    ? <View>{formatMenu({ menu: item.menu })}</View>
                                    : <Text>{item.menu.content}</Text>
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
