import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AppearanceProvider } from 'react-native-appearance'

import { ThemeManager } from './hooks/useTheme'

import useCachedResources from './hooks/useCachedResources'
import Navigation from './navigation'

export default function App () {
    const isLoadingComplete = useCachedResources()

    if (!isLoadingComplete) {
        return null
    } else {
        return (
            <SafeAreaProvider>
                <AppearanceProvider>
                    <ThemeManager>
                        <Navigation />
                    </ThemeManager>
                </AppearanceProvider>
            </SafeAreaProvider>
        )
    }
}
