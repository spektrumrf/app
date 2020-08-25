import React, { useContext, useState, useEffect } from 'react'
import { Appearance } from 'react-native-appearance'

import { retrieveData, storeData } from './useStorage'
import { ThemeColors, DefaultTheme, DarkTheme, PinkTheme } from '../constants/Colors'

const STORAGE_KEY = 'THEME_ID'
const ThemeContext = React.createContext(null)

export function getTheme (mode: string) {
    if (mode === 'standard') {
        if (Appearance.getColorScheme()) {
            mode = Appearance.getColorScheme()
        } else {
            mode = 'light'
        }
    }
    const Theme = {}
    for (const key in ThemeColors) {
        Theme[key] = ThemeColors[key][mode]
    }
    return Theme
}

export function getThemeId () {
    const { themeId } = useContext(ThemeContext)
    return themeId
}

export function getNavigatorTheme () {
    const themeId = getThemeId()
    if (themeId === 'light') {
        return DefaultTheme
    } else if (themeId === 'dark') {
        return DarkTheme
    } else if (themeId === 'pink') {
        return PinkTheme
    } else if (Appearance.getColorScheme() === 'light') {
        return DefaultTheme
    } else {
        return DarkTheme
    }
}

export function ThemeContextProvider ({ children }) {
    const [themeId, setThemeId] = useState('')

    useEffect(() => {
        (async () => {
            const storedThemeId = await retrieveData(STORAGE_KEY)
            if (storedThemeId) {
                setThemeId(storedThemeId)
            } else if (Appearance.getColorScheme()) {
                setThemeId('standard')
            } else {
                setThemeId('light')
            }
        })()
    }, [])

    return (
        <ThemeContext.Provider value={{ themeId, setThemeId }}>
            {themeId ? children : null}
        </ThemeContext.Provider>
    )
}

export function withTheme (Component) {
    return props => {
        const { themeId, setThemeId } = useContext(ThemeContext)

        function setTheme (themeId: string) {
            storeData(STORAGE_KEY, themeId)
            setThemeId(themeId)
        }

        return (
            <Component
                {...props}
                theme={getTheme(themeId)}
                setTheme={setTheme}
            />
        )
    }
}
