import React from 'react'
import { ScrollView, RefreshControl } from 'react-native'

import { withTheme } from '../hooks/useTheme'
import { View } from '../components/Themed'

function LoadingScreen ({ theme }) {
    return (
        <View>
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

export default withTheme(LoadingScreen)
