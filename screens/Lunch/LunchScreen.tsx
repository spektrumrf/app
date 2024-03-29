import React, { useState, useEffect } from 'react'
import { StyleSheet, FlatList, RefreshControl } from 'react-native'
import { Icon } from 'react-native-elements'

import { fetchLunch } from '../../api/lunch'
import { withTheme } from '../../hooks/useTheme'
import { Text, SafeAreaView, View, Card } from '../../components/Themed'
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
        function FormattedLunch ({ lunch, name, type, bold }) {
            return (
                <View>
                    <View style={styles.row}>
                        <Icon
                            style={{ paddingRight: 5 }}
                            color={theme.text}
                            name={name}
                            type={type}
                            size={18}
                        />
                        <Text
                            style={{ flexShrink: 1, fontWeight: bold ? 'bold' : 'normal' }}
                        >
                            {lunch.content}
                        </Text>
                    </View>
                    {lunch.allergens[0] ? <Text style={{ paddingLeft: 24 }}>{lunch.allergens[0]}</Text> : null}
                    {lunch.allergens[1] ? <Text style={{ paddingLeft: 24 }}>{lunch.allergens[1]}</Text> : null}
                    {lunch.allergens[2] ? <Text style={{ paddingLeft: 24 }}>{lunch.allergens[2]}</Text> : null}
                </View>
            )
        }

        function FormattedMenu ({ lunch }) {
            switch (lunch.type) {
            case 'info':
                return <FormattedLunch
                    lunch={lunch}
                    name={'info-outline'}
                    type={'materialicons'}
                    bold={false}
                />
            case 'lunch':
                return <FormattedLunch
                    lunch={lunch}
                    name={'restaurant-menu'}
                    type={'ionicons'}
                    bold={true}
                />
            case 'dessert':
                return <FormattedLunch
                    lunch={lunch}
                    name={'cupcake'}
                    type={'material-community'}
                    bold={true}
                />
            case 'vegan':
                return <FormattedLunch
                    lunch={lunch}
                    name={'leaf'}
                    type={'entypo'}
                    bold={true}
                />
            case 'special':
                return <FormattedLunch
                    lunch={lunch}
                    name={'credit'}
                    type={'entypo'}
                    bold={true}
                />
            case 'allergens':
                return <Text style={{ paddingLeft: 24 }}>
                    {lunch.content}
                </Text>
            }
        }

        return menu.map((lunch: {type: string, content: string, id: number}) => {
            return <View key={lunch.id}>
                <FormattedMenu lunch={lunch}/>
            </View>
        })
    }

    return (
        <SafeAreaView>
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
                    keyExtractor={item => item.title}
                    renderItem={({ item }) => (
                        <Card
                            title={item.title}
                            titleStyle={{ color: theme.text }}
                        >
                            <View style={styles.row}>
                                <Icon
                                    style={{ paddingRight: 5 }}
                                    color={theme.text}
                                    name='today'
                                    type='materialicons'
                                    size={18}
                                />
                                <Text>{item.date}</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon
                                    style={{ paddingRight: 5 }}
                                    color={theme.text}
                                    name='schedule'
                                    type='materialicons'
                                    size={18}
                                />
                                <Text>{item.open}</Text>
                            </View>
                            <View>
                                {formatMenu({ menu: item.menu })}
                            </View>
                        </Card>
                    )}
                />
            }
        </SafeAreaView>
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

export default withTheme(LunchScreen)
