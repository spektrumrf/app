import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView, TouchableHighlight, Share } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import HTML from 'react-native-render-html'
import { Icon } from 'react-native-elements'
import { getParentsTagsRecursively } from 'react-native-render-html/src/HTMLUtils'

import LoadingScreen from '../LoadingScreen'
import { useTheme } from '../../hooks/useTheme'
import Layout from '../../constants/Layout'
import { View } from '../../components/Themed'
import { fetchSpektrakletData } from '../../hooks/useSpektrakletApi'

const onShare = async (title, url) => {
    Share.share({
        message: `${title}\n#spektraklet\n\n${url}`
    })
}

export default function PostScreen ({ route }) {
    const { id } = route.params
    const { theme } = useTheme()

    const [post, setPost] = useState()
    const [loading, setLoading] = useState(true)
    const [share, setShare] = useState(false)

    useEffect(() => {
        let mounted = true
        const route = `posts/${id}`
        fetchSpektrakletData(route).then(res => {
            if (mounted) {
                setPost(res)
                setLoading(false)
            }
        })
        return () => mounted = false
    })

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
                    <HTML
                        html={post.title.rendered}
                        baseFontStyle={{ fontSize: 25, fontWeight: 'bold', color: theme.text }}
                    />
                    <TouchableHighlight
                        style={styles.container}
                        activeOpacity={1}
                        underlayColor={theme.background}
                        onShowUnderlay={() => setShare(true)}
                        onHideUnderlay={() => setShare(false)}
                        onPress={() =>
                            onShare(post.title.rendered, post.link)
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
                        html={post.content.rendered}
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
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15
    }
})
