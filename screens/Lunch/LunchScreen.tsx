import * as React from 'react'
import { StyleSheet } from 'react-native'

import { withTheme } from '../../hooks/useTheme'
import { Text, View } from '../../components/Themed'

function LunchScreen ({ theme }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lunch!</Text>
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

export default withTheme(LunchScreen)
