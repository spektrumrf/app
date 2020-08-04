import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import * as React from 'react'

import { useTheme } from '../hooks/useTheme'
import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import SpektrakletScreen from '../screens/SpektrakletScreen'
import PostScreen from '../screens/PostScreen'
import { BottomTabParamList, HomeParamList, TabTwoParamList, SpektrakletParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator () {
    const colorScheme = useColorScheme()
    const { mode, theme, toggle } = useTheme()
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            tabBarOptions={{ activeTintColor: theme.primary, inactiveTintColor: 'gray' }}>
            <BottomTab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name='home' type='font-awesome' color={color} />
                }}
            />
            <BottomTab.Screen
                name='TabTwo'
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name='code' type='font-awesome' color={color} />
                }}
            />
            <BottomTab.Screen
                name='Spektraklet'
                component={SpektrakletNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name='book' type='font-awesome' color={color} />
                }}
            />
        </BottomTab.Navigator>
    )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon (props: { name: string; color: string, type: string }) {
    return <Icon size={30} style={{ marginBottom: -3 }} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator<HomeParamList>()

function HomeNavigator () {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name='SettingsScreen'
                component={SettingsScreen}
                options={{ headerTitle: 'Inställningar' }}
            />
        </HomeStack.Navigator>
    )
}

const TabTwoStack = createStackNavigator<TabTwoParamList>()

function TabTwoNavigator () {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name='TabTwoScreen'
                component={TabTwoScreen}
                options={{ headerTitle: 'Tab Two Title' }}
            />
        </TabTwoStack.Navigator>
    )
}

const SpektrakletStack = createStackNavigator<SpektrakletParamList>()

function SpektrakletNavigator () {
    return (
        <SpektrakletStack.Navigator>
            <SpektrakletStack.Screen
                name='SpektrakletScreen'
                component={SpektrakletScreen}
                options={{ headerShown: false }}
            />
            <SpektrakletStack.Screen
                name='PostScreen'
                component={PostScreen}
                options={{ headerTitle: '' }}
            />
        </SpektrakletStack.Navigator>
    )
}
