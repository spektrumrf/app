
export const fetchSpektrakletData = async (route: string) => {
    try {
        const response = await fetch(`https://spektrum.fi/spektraklet/wp-json/wp/v2/${route}`, {
            method: 'get',
            headers: {
                Accept: 'application/json'
            }
        })
        const json = response.json()
        return json
    } catch (error) {
        console.error(error)
        return null
    }
}
