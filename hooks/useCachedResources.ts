import { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

export default function useCachedResources () {
    const [isLoadingComplete, setLoadingComplete] = useState(false)

    function cacheImages (images) {
        return images.map(image => {
            return Asset.fromModule(image).downloadAsync()
        })
    }

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync () {
            try {
                SplashScreen.preventAutoHideAsync()

                // Load images
                const imageAssets = cacheImages([
                    require('../assets/logo-black.png'),
                    require('../assets/logo-white.png'),
                    require('../assets/logo-pink.png')
                ])

                // Load fonts
                const fontAssets = Font.loadAsync({
                    ...Ionicons.font
                })

                await Promise.all([...imageAssets, fontAssets])
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e)
            } finally {
                setLoadingComplete(true)
                SplashScreen.hideAsync()
            }
        }

        loadResourcesAndDataAsync()
    }, [])

    return isLoadingComplete
}
