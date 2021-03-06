
import React, { useEffect, useState, useRef } from 'react'
import { TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import HTML from 'react-native-render-html'

import LoadingScreen from '../LoadingScreen'
import { withTheme } from '../../hooks/useTheme'
import { SafeAreaView, Card } from '../../components/Themed'
import { fetchSpektraklet } from '../../api/spektraklet'

function SpektrakletSceen ({ navigation, theme }) {
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [lastPage, setLastPage] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const isMountedRef = useRef(null)

    useEffect(() => {
        isMountedRef.current = true
        const route = `posts?_embed&per_page=5&page=${page}`
        fetchSpektraklet(route).then(res => {
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

    function onRefresh () {
        isMountedRef.current = true
        if (!loading) {
            setLoading(true)
            setRefreshing(true)
            const route = 'posts?_embed&per_page=5&page=1'
            fetchSpektraklet(route).then(res => {
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

    const tagsStyles = {
        a: {
            color: theme.primary
        },
        p: {
            color: theme.text
        }
    }

    function getImage ({ item }) {
        if (item.featured_media) {
            return { uri: item._embedded['wp:featuredmedia'][0].media_details.sizes['post-thumbnail'].source_url }
        } else {
            return null
        }
    }

    function decodeHtmlCharCodes (str: string) {
        return str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
            String.fromCharCode(charCode))
    }

    return (
        <SafeAreaView>
            {posts.length > 0 ? (
                <FlatList
                    refreshControl={<RefreshControl
                        colors={[theme.primary]}
                        tintColor={theme.primary}
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
                            containerStyle={{ borderRadius: 10, backgroundColor: theme.background }}
                            titleStyle={{
                                color: theme.text
                            }}
                            image={getImage({ item })}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Root', {
                                        screen: 'Spektraklet',
                                        params: {
                                            screen: 'PostScreen',
                                            params: {
                                                id: item.id
                                            }
                                        }
                                    })
                                }}
                            >
                                <HTML
                                    html={item.excerpt.rendered}
                                    tagsStyles={tagsStyles}
                                />
                            </TouchableOpacity>
                        </Card>
                    )}
                />
            ) : (
                <LoadingScreen/>
            )}
        </SafeAreaView>
    )
}

export default withTheme(SpektrakletSceen)
