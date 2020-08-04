import React from 'react'
import { StyleSheet, ScrollView, RefreshControl } from 'react-native'

import { useTheme } from '../hooks/useTheme'
import { View } from '../components/Themed'

export default function LoadingScreen () {
    const { theme } = useTheme()
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
