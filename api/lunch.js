import { parseString } from 'react-native-xml2js'
import moment from 'moment'

const KAIVOPIHA_URL = 'https://messi.hyyravintolat.fi/rss/sve/9'
const CHEMICUM_URL = 'https://messi.hyyravintolat.fi/rss/sve/10'
const EXACTUM_URL = 'https://messi.hyyravintolat.fi/rss/sve/11'
const CHEMICUM_EMPLOYEES_URL = 'https://messi.hyyravintolat.fi/rss/sve/41'

const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag']

const allergens = {
    'soijaa': 'soja',
    'valkosipulia': 'vitlök',
    'Vastuullisesti kalastettua': 'hållbart fiske',
    'Ilmastovalinta': 'miljöval',
    'palkokasveja': 'baljväxter',
    'gluteenia': 'gluten',
    'kalaa': 'fisk',
    'sinappia': 'senap',
    'Sisältää luomua': 'innehåller ekologiskt',
    'Sisältää Reilun kaupan tuotteita': 'innehåller fair trade',
    'seesaminsiemeniä': 'sesamfrön',
    'maapähkinää': 'jordnötter',
    'maitoa': 'mjölk',
    'kananmunaa': 'ägg',
    'selleriä': 'selleri'
}

const fetchRestaurant = async (url, name, id) => {
    try {
        const response = await fetch(url, {
            method: 'get'
        })
        const xml = await response.text()
        const parsed = await new Promise(resolve => {
            parseString(xml, (err, result) => {
                if (err) {
                    resolve(null)
                } else {
                    resolve(result)
                }
            })
        })

        let day = new Date().getDay()
        if (day === 0) day = 7

        if (!parsed) {
            return {
                id: id,
                title: name,
                date: `${days[day - 1]} ${moment(new Date()).format('DD.MM.YYYY')}`,
                food: ['Meny ur bruk']
            }
        }

        const date = parsed.rss.channel[0].item[day - 1].title
        const food = parsed.rss.channel[0].item[day - 1].description[0]
            .split('. ')
            .filter(x => x)
            .map(x => {
                if (x.includes('Allergeenit:')) {
                    for (const key in allergens) {
                        x = x.replace(key, allergens[key])
                    }
                    return x
                } else {
                    return x
                }
            })
            .map(x => x.split(': '))

        return {
            id: id,
            title: name,
            date: date,
            food: food
        }
    } catch (error) {
        let day = new Date().getDay()
        if (day === 0) day = 7

        console.error(error)
        return {
            id: id,
            title: name,
            date: `${days[day - 1]} ${moment(new Date()).format('DD.MM.YYYY')}`,
            food: ['Meny ur bruk']
        }
    }
}

export const fetchLunch = async () => {
    const lunch = await Promise.all([
        fetchRestaurant(KAIVOPIHA_URL, 'Kaivopiha', 1),
        fetchRestaurant(CHEMICUM_URL, 'Chemicum', 2),
        fetchRestaurant(EXACTUM_URL, 'Exactum', 3),
        fetchRestaurant(CHEMICUM_EMPLOYEES_URL, 'Chemicum Personal', 4)
    ])
    return lunch
}

export const fetchLunchNotification = async () => {
    const lunch = await fetchRestaurant(KAIVOPIHA_URL, 'Kaivopiha', 1)
    if (lunch.food.length > 1) {
        return lunch.food
            .filter(x => x[0].toLowerCase().includes('päivän lounas'))
            .map(x => x[1])
            .join('\n')
    } else {
        return ['Meny ur bruk']
    }
}
