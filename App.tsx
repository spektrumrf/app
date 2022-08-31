import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { ThemeContextProvider } from './hooks/useTheme'
import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

export default function App () {
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
