import { parseString } from 'react-native-xml2js'
import { Lunch, RawLunch } from '../types'
import moment from 'moment'

const KAIVOPIHA_URL = 'https://messi.hyyravintolat.fi/rss/sve/9'
const CHEMICUM_URL = 'https://messi.hyyravintolat.fi/rss/sve/10'
const EXACTUM_URL = 'https://messi.hyyravintolat.fi/rss/sve/11'
const PORTHANIA_URL = 'https://messi.hyyravintolat.fi/rss/sve/39'
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
    'Sisältää Reilun kaupan tuotteita': 'innehåller fair trade varor',
    'seesaminsiemeniä': 'sesamfrön',
    'maapähkinää': 'jordnötter',
    'maitoa': 'mjölk',
    'kananmunaa': 'ägg',
    'selleriä': 'selleri',
    'sinapinsiemeniä': 'senapsfrön',
    'pyydä G': 'be om G',
    'siemeniä': 'frön',
    'pähkinää': 'nötter'
}

async function fetchRestaurant (url: string, name: string): Promise<Lunch> {
    try {
        const response = await fetch(url, {
            method: 'get'
        })
        const xml = await response.text()
        const parsed = await new Promise<RawLunch>(resolve => {
            parseString(xml, (err: string, result: RawLunch) => {
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
                title: name,
                date: `${days[day - 1]} ${moment(new Date()).format('DD.MM.YYYY')}`,
                menu: [{ type: null, content: 'Meny ur bruk', id: 0 }]
            }
        }

        const date = parsed.rss.channel[0].item[day - 1].title[0]
        const menu = parsed.rss.channel[0].item[day - 1].description[0]
            .split('. ')
            .filter(item => item)
            .map(item => {
                if (item.includes('Allergeenit:')) {
                    for (const key in allergens) {
                        item = item.replace(key, allergens[key])
                    }
                    return item
                } else {
                    return item
                }
            })
            .map(item => item.split(': '))
            .map((pair, index) => {
                return {
                    type: pair[0],
                    content: pair[1],
                    id: index
                }
            })
        console.log(menu)    

        return {
            title: name,
            date: date,
            menu: menu
        }
    } catch (error) {
        let day = new Date().getDay()
        if (day === 0) day = 7

        console.error(error)
        return {
            title: name,
            date: `${days[day - 1]} ${moment(new Date()).format('DD.MM.YYYY')}`,
            menu: [{ type: null, content: 'Meny ur bruk', id: 0 }]
        }
    }
}

export async function fetchLunch () {
    const lunch = await Promise.all([
        fetchRestaurant(CHEMICUM_URL, 'Chemicum', 1),
        fetchRestaurant(EXACTUM_URL, 'Exactum', 2),
        fetchRestaurant(KAIVOPIHA_URL, 'Kaivopiha', 3),
        fetchRestaurant(PORTHANIA_URL, 'Porthania', 4),
        fetchRestaurant(CHEMICUM_EMPLOYEES_URL, 'Chemicum Personal', 5)
    ])
    return lunch
}
