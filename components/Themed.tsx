import * as React from 'react'
import { Text as DefaultText, View as DefaultView } from 'react-native'
import { Card as DefaultCard } from 'react-native-elements'
import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context'

import { getThemeId, getTheme } from '../hooks/useTheme'

export function useThemeColor (colorName : string) {
    const themeId = getThemeId()
    const theme = getTheme(themeId)
    return theme[colorName]
}

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];
export type CardProps = DefaultCard['props']

export function Text (props: TextProps) {
    const { style, ...otherProps } = props
    const color = useThemeColor('text')

    return <DefaultText style={[{ color }, style]} {...otherProps} />
}

export function View (props: ViewProps) {
    const { style, ...otherProps } = props
    const backgroundColor = useThemeColor('background')

    return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function SafeAreaView (props: ViewProps) {
    const { style, ...otherProps } = props
    const backgroundColor = useThemeColor('background')

    return <DefaultSafeAreaView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function Card (props: CardProps) {
    const { containerStyle, ...otherProps } = props
    const backgroundColor = useThemeColor('background')
    const borderRadius = 10

    return <DefaultCard containerStyle={[{ backgroundColor, borderRadius }, containerStyle]} {...otherProps} />
}
