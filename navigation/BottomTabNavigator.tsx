import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import Emoji from 'react-native-emoji'
import * as React from 'react'

import { View } from '../components/Themed'
import { useTheme } from '../hooks/useTheme'
import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import TabTwoScreen from '../screens/TabTwoScreen'
import SpektrakletScreen from '../screens/SpektrakletScreen'
import PostScreen from '../screens/PostScreen'
import ActivitiesScreen from '../screens/ActivitiesScreen'
import { BottomTabParamList, HomeParamList, TabTwoParamList, SpektrakletParamList, ActivitiesParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

export default function BottomTabNavigator () {
    const { theme } = useTheme()
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            tabBarOptions={{ activeTintColor: theme.primary, inactiveTintColor: 'gray', showLabel: false }}>
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
            <BottomTab.Screen
                name='Activities'
                component={ActivitiesNavigator}
                options={{
                    tabBarIcon: (color) => color.focused
                        ? <Emoji name="tada" style={{marginBottom: 5, fontSize: 30, opacity: 1.0}} /> 
                        : <Emoji name="tada" style={{marginBottom: 5, fontSize: 30, opacity: 0.7}} />
                }}
            />
        </BottomTab.Navigator>
    )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon (props: { name: string; color: string, type: string }) {
    return <Icon size={34} {...props} />
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

const ActivitiesStack = createStackNavigator<ActivitiesParamList>()

function ActivitiesNavigator () {
    return (
        <ActivitiesStack.Navigator>
            <ActivitiesStack.Screen
                name='ActivitiesScreen'
                component={ActivitiesScreen}
                options={{ headerShown: false }}
            />
        </ActivitiesStack.Navigator>
    )
}
