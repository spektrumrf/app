import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements'
import Emoji from 'react-native-emoji'
import * as React from 'react'

import { withTheme } from '../hooks/useTheme'
import HomeScreen from '../screens/Home/HomeScreen'
import SettingsScreen from '../screens/Home/SettingsScreen'
import LunchScreen from '../screens/Lunch/LunchScreen'
import SpektrakletScreen from '../screens/Spektraklet/SpektrakletScreen'
import PostScreen from '../screens/Spektraklet/PostScreen'
import ActivitiesScreen from '../screens/Activities/ActivitiesScreen'
import SongArchiveScreen from '../screens/Activities/SongArchiveScreen'
import CalendarScreen from '../screens/Activities/CalendarScreen'
import { BottomTabParamList, HomeParamList, LunchParamList, SpektrakletParamList, ActivitiesParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

function BottomTabNavigator ({ theme }) {
    return (
        <BottomTab.Navigator
            initialRouteName='Home'
            tabBarOptions={{ activeTintColor: theme.primary, inactiveTintColor: theme.idle, showLabel: false }}>
            <BottomTab.Screen
                name='Home'
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <Icon name='home' type='font-awesome-5' size={30} color={color} />
                }}
            />
            <BottomTab.Screen
                name='Lunch'
                component={LunchNavigator}
                options={{
                    tabBarIcon: ({ color }) => <Icon name='utensils' type='font-awesome-5' size={28} color={color} />
                }}
            />
            <BottomTab.Screen
                name='Spektraklet'
                component={SpektrakletNavigator}
                options={{
                    tabBarIcon: ({ color }) => <Icon name='newspaper' type='font-awesome-5' size={32} color={color} />
                }}
            />
            <BottomTab.Screen
                name='Activities'
                component={ActivitiesNavigator}
                options={{
                    tabBarIcon: (color) => color.focused
                        ? <Emoji name='tada' style={{ marginBottom: 5, fontSize: 30, opacity: 1.0 }} />
                        : <Emoji name='tada' style={{ marginBottom: 5, fontSize: 30, opacity: 0.7 }} />
                }}
            />
        </BottomTab.Navigator>
    )
}

export default withTheme(BottomTabNavigator)

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

const LunchStack = createStackNavigator<LunchParamList>()

function LunchNavigator () {
    return (
        <LunchStack.Navigator>
            <LunchStack.Screen
                name='LunchScreen'
                component={LunchScreen}
                options={{ headerShown: false }}
            />
        </LunchStack.Navigator>
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
            <ActivitiesStack.Screen
                name='SongArchiveScreen'
                component={SongArchiveScreen}
                options={{ headerTitle: '' }}
            />
            <ActivitiesStack.Screen
                name='CalendarScreen'
                component={CalendarScreen}
                options={{ headerTitle: '' }}
            />
        </ActivitiesStack.Navigator>
    )
}
