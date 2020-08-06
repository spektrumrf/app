const functions = require('firebase-functions')
const { google } = require('googleapis')
const calendar = google.calendar('v3')
const OAuth2 = google.auth.OAuth2

const googleCredentials = require('./credentials.json')

const listEvents = (calendarId, auth) => {
    return new Promise((resolve, reject) => {
        calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: (new Date()).toISOString(),
            maxResults: 42,
            singleEvents: true,
            orderBy: 'startTime'
        }, (err, res) => {
            if (err) {
                reject(err)
            } else {
                const events = res.data.items
                const result = []
                if (events.length) {
                    let id = 1
                    for (const event of events) {
                        const start = event.start.dateTime || event.start.date
                        result.push({
                            id: id,
                            event: event.summary,
                            date: start
                        })
                        id++
                    }
                }
                resolve(result)
            }
        })
    })
}

exports.retrieveCalendarEvents = functions.https.onRequest((request, response) => {
    const oAuth2Client = new OAuth2(
        googleCredentials.web.client_id,
        googleCredentials.web.client_secret,
        googleCredentials.web.redirect_uris[0]
    )

    oAuth2Client.setCredentials({
        refresh_token: googleCredentials.refresh_token
    })

    listEvents(request.body.calendarId, oAuth2Client).then(data => {
        response.status(200).send(data)
    }).catch(err => {
        functions.logger.error('Error retrieving', err)
        response.status(500).send({ status: 500, message: 'Calendar Error' })
    })
})
