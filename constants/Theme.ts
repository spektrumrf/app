const primary = '#FF60A5'

export const ThemeColors = {
    id: {
        light: 'light',
        dark: 'dark',
        pink: 'pink'
    },
    text: {
        light: 'black',
        dark: 'white',
        pink: 'black'
    },
    background: {
        light: 'white',
        dark: 'black',
        pink: 'pink'
    },
    primary: {
        light: primary,
        dark: primary,
        pink: primary
    },
    idle: {
        light: 'gray',
        dark: 'gray',
        pink: 'gray'
    },
    tabIconSelected: {
        light: primary,
        dark: primary,
        pink: primary
    },
    iconSize: {
        light: 34,
        dark: 34,
        pink: 34
    },
    margin: {
        light: 15,
        dark: 15,
        pink: 15
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

export const PinkTheme = {
    dark: false,
    colors: {
        primary: '#FF60A5',
        background: 'white',
        card: 'pink',
        text: 'black',
        border: 'gray',
        notification: 'gray'
    }
}
