import { parseString } from 'react-native-xml2js'

export const fetchSongArchive = async () => {
    try {
        const response = await fetch('https://spektrum.fi/sangarkiv/feed', {
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
        return parsed.rss.channel[0].item
    } catch (error) {
        console.error(error)
        return null
    }
}
