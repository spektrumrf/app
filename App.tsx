import React from 'react'
import { YellowBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ThemeContextProvider } from './hooks/useTheme'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

export default function App () {
    // Prevent timer, open issue (react-native/issues/12981)
    YellowBox.ignoreWarnings(['Setting a timer'])
    const _console = { ...console }
    console.warn = message => {
        if (message.indexOf('Setting a timer') <= -1) {
            _console.warn(message)
        }
    }

    // SplashScreen while loading assets
    const isLoadingComplete = useCachedResources()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <SafeAreaProvider>
                <ThemeContextProvider>
                    <Navigation />
                </ThemeContextProvider>
            </SafeAreaProvider>
        )
    }
}
