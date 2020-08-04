import { Ionicons } from '@expo/vector-icons'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import * as React from 'react'

export default function useCachedResources () {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false)

    function cacheImages (images) {
        return images.map(image => {
            return Asset.fromModule(image).downloadAsync()
        })
    }

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync () {
            try {
                SplashScreen.preventAutoHideAsync()

                // Load images
                const imageAssets = cacheImages([
                    require('../assets/images/logo-black.png'),
                    require('../assets/images/logo-white.png'),
                    require('../assets/images/logo-pink.png')
                ])

                // Load fonts
                const fontAssets = Font.loadAsync({
                    ...Ionicons.font,
                    'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf')
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
