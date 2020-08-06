import env from '../env'

export const useCalendar = async () => {
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
        const json = response.json()
        return json
    } catch (error) {
        console.error(error)
        return null
    }
}
