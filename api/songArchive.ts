import { parseString } from 'react-native-xml2js'
import { SongArchive, RawSongArchive } from '../types'
import moment from 'moment'

export async function fetchSongArchive (): Promise<SongArchive> {
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
                title: song.description[0].split('\n')[0],
                author: song['dc:creator'][0],
                description: song.description[0].split('\n').slice(1).join('\n'),
                date: moment(song.pubDate[0]).format('YYYY-MM-DD')
            }
        })
    } catch (error) {
        console.error(error)
        return null
    }
}
