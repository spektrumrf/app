import React, { useContext, useState, useEffect } from 'react'
import { Appearance } from 'react-native-appearance'

import { retrieveData, storeData } from './useStorage'
import { ThemeColors, DefaultTheme, DarkTheme, PinkTheme } from '../constants/Theme'

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

export function ThemeContextProvider ({ children }) {
    const [themeID, setThemeID] = useState('')

    useEffect(() => {
        (async () => {
            const storedThemeID = await retrieveData(STORAGE_KEY)
            if (storedThemeID) {
                setThemeID(storedThemeID)
            } else if (Appearance.getColorScheme()) {
                setThemeID('standard')
            } else {
                setThemeID('light')
            }
        })()
    }, [])

    return (
        <ThemeContext.Provider value={{ themeID, setThemeID }}>
            {themeID ? children : null}
        </ThemeContext.Provider>
    )
}

export function getThemeID () {
    const { themeID } = useContext(ThemeContext)
    return themeID
}

export function getNavigatorTheme () {
    const themeId = getThemeID()
    if (themeId === 'light') {
        return DefaultTheme
    } else if (themeId === 'dark') {
        return DarkTheme
    } else {
        return PinkTheme
    }
}

export function withTheme (Component) {
    return props => {
        const { themeID, setThemeID } = useContext(ThemeContext)

        const setTheme = themeID => {
            storeData(STORAGE_KEY, themeID)
            setThemeID(themeID)
        }

        return (
            <Component
                {...props}
                theme={getTheme(themeID)}
                setTheme={setTheme}
            />
        )
    }
}
