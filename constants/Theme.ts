const primary = '#FF60A5'
const secondary = 'pink'

export const ThemeColors = {
    id: {
        light: 'light',
        dark: 'dark'
    },
    text: {
        light: 'black',
        dark: 'white'
    },
    background: {
        light: 'white',
        dark: 'black'
    },
    primary: {
        light: primary,
        dark: primary
    },
    secondary: {
        light: secondary,
        dark: secondary
    },
    idle: {
        light: 'gray',
        dark: 'gray'
    },
    tabIconSelected: {
        light: primary,
        dark: primary
    },
    iconSize: {
        light: 34,
        dark: 34
    },
    margin: {
        light: 15,
        dark: 15
    }
}

export const DarkTheme = {
    dark: true,
    colors: {
        primary: '#FF60A5',
        background: 'black',
        card: 'black',
        text: 'white',
        border: 'gray',
        notification: 'white'
    }
}

export const DefaultTheme = {
    dark: false,
    colors: {
        primary: '#FF60A5',
        background: 'white',
        card: 'white',
        text: 'black',
        border: 'gray',
        notification: 'gray'
    }
}
