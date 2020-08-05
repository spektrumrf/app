import React, { useContext, useState, useEffect } from 'react'
import { Appearance } from 'react-native-appearance'

import { retrieveData, storeData } from './useStorage'
import { getTheme } from '../constants/Theme'

const STORAGE_KEY = 'THEME_ID'
const ThemeContext = React.createContext()

export const ThemeContextProvider = ({ children }) => {
    const [themeID, setThemeID] = useState()

    useEffect(() => {
        (async () => {
            const storedThemeID = await retrieveData(STORAGE_KEY)
            if (storedThemeID) {
                setThemeID(storedThemeID)
            } else if (Appearance.getColorScheme()) {
                setThemeID(Appearance.getColorScheme())
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

export function withTheme (Component) {
    return props => {
        const { themeID, setThemeID } = useContext(ThemeContext)

        // const getTheme = themeID => THEMES.find(theme => theme.key === themeID);
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
