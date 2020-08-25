import { parseString } from 'react-native-xml2js'
import { SongArchive, RawSongArchive } from '../types'
import moment from 'moment'

export const fetchSongArchive = async (): Promise<SongArchive> => {
    try {
        const response = await fetch('https://spektrum.fi/sangarkiv/feed', {
            method: 'get'
        })
        const xml = await response.text()
        const parsed = await new Promise<RawSongArchive>(resolve => {
            parseString(xml, (err: string, result: RawSongArchive) => {
                if (err) {
                    resolve(null)
                } else {
                    resolve(result)
                }
            })
        })
        return parsed.rss.channel[0].item.map(song => {
            return {
                id: song.link[0],
                title: song.title[0],
                description: song.description[0],
                date: moment(song.pubDate[0]).format('YYYY-MM-DD')
            }
        })
    } catch (error) {
        console.error(error)
        return null
    }
}
