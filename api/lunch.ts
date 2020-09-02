import { parseString } from 'react-native-xml2js'
import { Lunch, RawLunch } from '../types'
import * as constants from '../constants/Lunch'
import moment from 'moment'

function formatType (type: string): string {
    if (type.includes('vegaani')) {
        return 'vegan'
    } else if (type.includes('tiedoitus')) {
        return 'info'
    } else if (type.includes('makeasti')) {
        return 'dessert'
    } else if (type.includes('erikoinen')) {
        return 'special'
    } else if (type.includes('allergeenit')) {
        return 'allergens'
    } else {
        return 'lunch'
    }
}

async function fetchRestaurant (name: string, id: number): Promise<Lunch> {
    try {
        const response = await fetch(`https://messi.hyyravintolat.fi/rss/sve/${id}`, {
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

        if (!parsed || day === 6 || day === 7) {
            return {
                title: name,
                date: `${constants.days[day - 1]} ${moment(new Date()).format('DD.MM.YYYY')}`,
                menu: [{ type: 'info', content: 'Meny ur bruk', id: `${name}: 0` }]
            }
        }

        const date = parsed.rss.channel[0].item[day - 1].title[0]
        const menu = parsed.rss.channel[0].item[day - 1].description[0]
            .split('. ')
            .filter(item => item)
            .map(item => {
                if (item.includes('Allergeenit:')) {
                    for (const key in constants.allergens) {
                        item = item.replace(key, constants.allergens[key])
                    }
                    return item
                } else {
                    return item
                }
            })
            .map(item => item.split(': '))
            .filter(item => item[1] !== '.')
            .map((pair, index) => {
                return {
                    type: formatType(pair[0].toLowerCase()),
                    content: pair[1],
                    id: `${name}: ${index}`
                }
            })

        let index = 0
        while (index < menu.length - 1) {
            if (menu[index].type === 'lunch' && menu[index + 1].type === 'allergens') {
                if (menu[index + 1].content.split(', ').includes('VE')) {
                    menu[index].type = 'vegan'
                }
            }
            index++
        }

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
            date: `${constants.days[day - 1]} ${moment(new Date()).format('DD.MM.YYYY')}`,
            menu: [{ type: 'info', content: 'Meny ur bruk', id: `${name}: 0` }]
        }
    }
}

export async function fetchLunch () {
    const lunch = await Promise.all([
        fetchRestaurant('Chemicum', 10),
        fetchRestaurant('Physicum', 12),
        fetchRestaurant('Exactum', 11),
        fetchRestaurant('Kaivopiha', 9),
        fetchRestaurant('Porthania', 39)
    ])
    return lunch
}
