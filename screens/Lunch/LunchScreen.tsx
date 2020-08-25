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

    const formatMenu = (menu: any) => {
        const FormattedLunch = ({lunch, i, name, type}) => {
            return (
                <View style={styles.row} key={i}>
                    <Icon
                        key={'icon'}
                        style={{ paddingRight: 5 }}
                        color={theme.text}
                        name={name}
                        type={type}
                        size={18}
                    />
                    <Text 
                        style={{ flexShrink: 1, fontWeight: 'bold' }}
                        key={'content'}>
                        {lunch.content}
                    </Text>
                </View>
            )
        }

        return menu.map((lunch: {type: string, content: string}, i: number) => {
            if (lunch.content === '.') {
                return
            } else if (lunch.type.toLowerCase().includes('tiedoitus')) {
                return <FormattedLunch
                    lunch={lunch}
                    i={i}
                    name={'info-outline'}   
                    type={'materialicons'}
                />
            } else if (lunch.type.toLowerCase().includes('päivän lounas')) {
                return <FormattedLunch
                    lunch={lunch}
                    i={i}
                    name={'restaurant-menu'}
                    type={'ionicons'}
                />
            } else if (lunch.type.toLowerCase().includes('makeasti')) {
                return <FormattedLunch
                    lunch={lunch}
                    i={i}
                    name={'cupcake'}
                    type={'material-community'}
                />
            } else if (lunch.type.toLowerCase().includes('vegaani')) {
                return <FormattedLunch
                    lunch={lunch}
                    i={i}
                    name={'leaf'}
                    type={'entypo'}
                />
            } else if (lunch.type.toLowerCase().includes('erikoinen')) {
                return <FormattedLunch
                    lunch={lunch}
                    i={i}
                    name={'credit'}
                    type={'entypo'}
                />
            } else if (lunch.type.toLowerCase().includes('allergeenit')) {
                return <Text style={{ paddingRight: 24 }}>
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
                                    ? <View>{formatMenu(item.menu)}</View>
                                    : <Text >{item.menu.content}</Text>
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
