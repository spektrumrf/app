import * as React from 'react'
import { Text as DefaultText, View as DefaultView } from 'react-native'
import { SafeAreaView as DefaultSafeAreaView } from 'react-native-safe-area-context'

import { getTheme } from '../constants/Theme'
import { getThemeID } from '../hooks/useTheme'

export function useThemeColor (colorName : string) {
    const themeID = getThemeID()
    const theme = getTheme(themeID)
    return theme[colorName]
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

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
