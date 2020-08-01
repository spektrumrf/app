
import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import HTML from 'react-native-render-html'
import { Card } from 'react-native-elements'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import LoadingScreen from './LoadingScreen'
import { View } from '../components/Themed'
import { fetchSpektrakletData } from '../hooks/useSpektrakletApi'

export default function SpektrakletSceen ({ navigation }) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [lastPage, setLastPage] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const isMountedRef = useRef(null)

    useEffect(() => {
        isMountedRef.current = true
        const route = `posts?_embed&per_page=5&page=${page}`
        fetchSpektrakletData(route).then(res => {
            if (isMountedRef.current) {
                if (res.code !== 'rest_post_invalid_page_number') {
                    if (refreshing) {
                        setPosts([...res])
                    } else {
                        setPosts(prevPosts => [...prevPosts, ...res])
                    }
                } else {
                    setLastPage(true)
                }
                setLoading(false)
                setRefreshing(false)
            }
        })
        return () => isMountedRef.current = false
    }, [page])

    const onRefresh = () => {
        isMountedRef.current = true
        if (!loading) {
            setLoading(true)
            setRefreshing(true)
            const route = 'posts?_embed&per_page=5&page=1'
            fetchSpektrakletData(route).then(res => {
                if (isMountedRef.current) {
                    setPage(1)
                    setPosts([...res])
                    setLastPage(false)
                    setLoading(false)
                    setRefreshing(false)
                }
            })
        }
        return () => isMountedRef.current = false
    }

    const colorScheme = useColorScheme()

    const tagsStyles = {
        a: {
            color: Colors[colorScheme].tint
        }
    }

    const getImage = (item) => {
        if (item.featured_media) {
            return { uri: item._embedded['wp:featuredmedia'][0].media_details.sizes['post-thumbnail'].source_url }
        } else {
            return null
        }
    }

    const decodeHtmlCharCodes = (str) =>
        str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
            String.fromCharCode(charCode))

    return (
        <View style={styles.container}>
            {posts.length > 0 ? (
                <FlatList
                    refreshControl={<RefreshControl
                        colors={[Colors[colorScheme].tint]}
                        refreshing={refreshing}
                        onRefresh={() => onRefresh()} />
                    }
                    onEndReached={() => {
                        if (!loading && !refreshing && !lastPage) {
                            setPage(prevPage => prevPage + 1)
                        }
                    }}
                    onEndReachedThreshold={0.3}
                    data={posts}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <Card
                            title={decodeHtmlCharCodes(item.title.rendered)}
                            titleStyle={{
                                color: Colors[colorScheme].text
                            }}
                            image={getImage(item)}
                        >
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Root', {
                                    screen: 'Spektraklet',
                                    params: {
                                        screen: 'Post',
                                        params: {
                                            id: item.id
                                        }
                                    }
                                })
                            }}>
                                <HTML
                                    html={item.excerpt.rendered}
                                    tagsStyles={tagsStyles}
                                />
                            </TouchableOpacity>
                        </Card>
                    )
                    }
                />
            ) : (
                <LoadingScreen/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
