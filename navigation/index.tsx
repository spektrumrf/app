import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import { withTheme, getNavigatorTheme } from '../hooks/useTheme'
import { RootStackParamList } from '../types'
import NotFoundScreen from '../screens/NotFoundScreen'
import BottomTabNavigator from './BottomTabNavigator'

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
function Navigation () {
    return (
        <NavigationContainer
            theme={getNavigatorTheme()}>
            <RootNavigator />
        </NavigationContainer>
    )
}

export default withTheme(Navigation)

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>()

function RootNavigator () {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Root' component={BottomTabNavigator} />
            <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    )
}
