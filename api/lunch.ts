import { Lunch } from '../types'
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

function translateAllergens (allergens: string): string {
    for (const key in constants.allergens) {
        allergens = allergens.replace(key, constants.allergens[key])
    }
    return allergens
}

async function fetchRestaurant (name: string, id: number): Promise<Lunch> {
    try {
        const response = await fetch('https://unicafe.fi/wp-json/swiss/v1/restaurants/?lang=sv', {
            method: 'get'
        })
        const restaurants = await response.json()
        const restaurant = restaurants.filter(r => r.id === id)[0]

        const date = moment(new Date()).format('DD.MM')

        const [todays] = restaurant.menuData.menus.filter(item => item.date.includes(date))
        const menu = todays.data.map((item, index) => {
            return {
                type: formatType(item.price.name.toLowerCase()),
                content: item.name,
                allergens: [
                    translateAllergens(item.meta['0'].join(', ')),
                    translateAllergens(item.meta['1'].join(', ')),
                    translateAllergens(item.meta['2'].join(', '))
                ],
                id: `${name}: ${index}`
            }
        })
            .filter(item => item.type !== 'info' && item.content !== '.')

        const numDay = moment().weekday()
        const label = (numDay === 6 || numDay === 7) ? 'La–Su' : 'Ma–Pe'
        let [visitingInfo] = restaurant.menuData.visitingHours.lounas.items.filter(item => item.label === label)
        if (!visitingInfo) {
            [visitingInfo] = restaurant.menuData.visitingHours.lounas.items.filter(item => item.label === 'Ma–Su')
        }

        return {
            title: name,
            date: todays.date,
            open: visitingInfo.closedException ? 'Stängt' : visitingInfo.hours,
            menu: menu
        }
    } catch (error) {
        let day = new Date().getDay()
        if (day === 0) day = 7

        console.error(error)
        return {
            title: name,
            date: `${constants.days[day - 1]} ${moment(new Date()).format('DD.MM')}`,
            open: 'Stängt',
            menu: [{ type: 'info', content: 'Meny ur bruk', allergens: [''], id: `${name}: 0` }]
        }
    }
}

export async function fetchLunch () {
    const lunch = await Promise.all([
        fetchRestaurant('Chemicum', 1354),
        fetchRestaurant('Physicum', 1363),
        fetchRestaurant('Exactum', 1356),
        fetchRestaurant('Kaivopiha', 2543),
        fetchRestaurant('Porthania', 1364)
    ])
    return lunch
}
