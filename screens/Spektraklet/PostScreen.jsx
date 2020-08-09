import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, TouchableHighlight, Share } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import HTML from 'react-native-render-html'
import { Icon } from 'react-native-elements'
import { getParentsTagsRecursively } from 'react-native-render-html/src/HTMLUtils'
import moment from 'moment'

import LoadingScreen from '../LoadingScreen'
import { withTheme } from '../../hooks/useTheme'
import Layout from '../../constants/Layout'
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
            if (mounted) {
                setContent(res.content.rendered)
                setLink(res.link)
                setTitle(decodeHtmlCharCodes(res.title.rendered))
                setAuthorId(res.author)
                setDate(moment(res.date).format('YYYY-MM-DD'))
                setLoading(false)

                firestore.collection('activities').doc('writers').get().then(res => {
                    const authors = res.data()
                    console.log(authorId, authors[authorId])
                    setAuthor(authors[authorId])
                    setLoading(false)
                })
            }
        })
        return () => mounted = false
    }, [])

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
                    <View style={styles.element}>
                    <Text style={{ color: theme.text, ...styles.title }} >
                        {title}
                    </Text>
                    </View>
                    <Text style={{ color: theme.text }} >
                        {author}
                    </Text>
                    <Text style={{ color: theme.text }} >
                        {date}
                    </Text>
                    <TouchableHighlight
                        style={styles.element}
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
                            size={27}
                        />
                    </TouchableHighlight>
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
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    element: {
        paddingTop: 15
    }
})

export default withTheme(PostScreen)
