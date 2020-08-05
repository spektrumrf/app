import React from 'react'
import { StyleSheet, ScrollView, RefreshControl } from 'react-native'

import { withTheme } from '../hooks/useTheme'
import { View } from '../components/Themed'

function LoadingScreen ({ theme }) {
    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        colors={[theme.primary]}
                        tintColor={theme.primary}
                        refreshing={true}
                    />
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default withTheme(LoadingScreen)
