import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, TouchableHighlight, Share } from 'react-native'
import { Icon } from 'react-native-elements'
import { getParentsTagsRecursively } from 'react-native-render-html/src/HTMLUtils'
import * as WebBrowser from 'expo-web-browser'
import HTML from 'react-native-render-html'
import moment from 'moment'

import LoadingScreen from '../LoadingScreen'
import Layout from '../../constants/Layout'
import { withTheme } from '../../hooks/useTheme'
import { View, Text } from '../../components/Themed'
import { useFirestore } from '../../hooks/useFirestore'
import { fetchSpektraklet } from '../../api/spektraklet'

const onShare = async (title, url) => {
    Share.share({
        message: `${title}\n#spektraklet\n\n${url}`
    })
}

const decodeHtmlCharCodes = (str) =>
    str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
        String.fromCharCode(charCode))

function PostScreen ({ route, theme }) {
    const { id } = route.params

    const firestore = useFirestore()

    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [authorId, setAuthorId] = useState('')
    const [link, setLink] = useState('')
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(true)
    const [share, setShare] = useState(false)

    useEffect(() => {
        let mounted = true
        const route = `posts/${id}`
        fetchSpektraklet(route).then(res => {
            if (mounted && res) {
                setContent(res.content.rendered)
                setLink(res.link)
                setTitle(decodeHtmlCharCodes(res.title.rendered))
                setAuthorId(res.author)
                setDate(moment(res.date).format('YYYY-MM-DD'))
                setLoading(false)
            }
        })
        return () => mounted = false
    }, [])

    useEffect(() => {
        firestore.collection('activities').doc('writers').get().then(res => {
            const authors = res.data()
            setAuthor(authors[authorId])
        })
    }, [authorId])

    const tagsStyles = {
        a: {
            color: theme.primary
        },
        img: {
            paddingTop: 10
        },
        figure: {
            paddingTop: 15,
            paddingBottom: 15
        },
        figcaption: {
            color: theme.text,
            fontSize: 14
        }
    }

    return (
        <View style={styles.container}>
            {!loading ? (
                <ScrollView>
                    <View style={styles.head}>
                        <Text style={{ color: theme.text, ...styles.title }} >
                            {title}
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Icon
                            color={theme.text}
                            name='person'
                            type='ionicons'
                            size={18}
                        />
                        <Text style={{ color: theme.text, ...styles.info }} >
                            {author}
                        </Text>
                        <Icon
                            color={theme.text}
                            name='date-range'
                            type='materialicons'
                            size={18}
                        />
                        <Text style={{ color: theme.text, ...styles.info }} >
                            {date}
                        </Text>
                        <TouchableHighlight
                            style={styles.info}
                            activeOpacity={1}
                            underlayColor={theme.background}
                            onShowUnderlay={() => setShare(true)}
                            onHideUnderlay={() => setShare(false)}
                            onPress={() =>
                                onShare(title, link)
                            }>
                            <Icon
                                color={share ? theme.primary : theme.text}
                                name='share'
                                type='fontisto'
                                size={18}
                            />
                        </TouchableHighlight>
                    </View>
                    <HTML
                        style={{ alignSelf: 'center' }}
                        html={content}
                        baseFontStyle={{ fontSize: 18, color: theme.text }}
                        tagsStyles={tagsStyles}
                        imagesMaxWidth={Layout.window.width - 30}
                        ignoredStyles={['width', 'height', 'video']}
                        onLinkPress={(evt, href) => WebBrowser.openBrowserAsync(href)}
                        alterNode = { (node) => {
                            const { name, parent } = node
                            // If the tag is <a> and parent is <figcaption>
                            if (name === 'a' && getParentsTagsRecursively(parent).indexOf('figcaption') !== -1) {
                                // Change fontSize
                                node.attribs = { ...(node.attribs || {}), style: 'fontSize: 14;' }
                                return node
                            }
                        }
                        }
                    />
                </ScrollView>
            ) : (
                <LoadingScreen/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 15,
        paddingRight: 15
    },
    head: {
        paddingTop: 15
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row',
        paddingTop: 15
    },
    info: {
        marginRight: 15
    }
})

export default withTheme(PostScreen)
