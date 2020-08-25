import env from '../env.json'
import { Calendar } from '../types'

export async function fetchCalendar (): Promise<Calendar> {
    try {
        const response = await fetch(env.calendar.url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                calendarId: env.calendar.calendarId,
                password: env.calendar.password
            })
        })
        const json = await response.json()
        return json
    } catch (error) {
        console.error(error)
        return null
    }
}
