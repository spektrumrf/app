import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import HTML from 'react-native-render-html';
import { getParentsTagsRecursively } from 'react-native-render-html/src/HTMLUtils';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LoadingScreen from './LoadingScreen'
import { View } from '../components/Themed';
import { fetchSpektrakletData } from '../hooks/useSpektrakletApi';

export default function PostScreen({ route }) {
  const { id } = route.params;

  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let mounted = true;
    const route = `posts/${id}`;
    fetchSpektrakletData(route).then(res => {
      if (mounted) {
        setPost(res)
        setLoading(false)
      }
    });
    return () => mounted = false;
  });

  const colorScheme = useColorScheme();

  const tagsStyles = {
    a: {
      color: Colors[colorScheme].tint
    },
    img: {
      paddingTop: 10
    },
    figure: {
      paddingTop: 15,
      paddingBottom: 15,
    },
    figcaption: {
      fontSize: 14
    }
  }

  return (
    <View style={styles.container}>
      {!loading ? (
        <ScrollView>
          <HTML html={`<h1>${post.title.rendered}</h1>`}/>
          <HTML
            style={{alignSelf:'center'}}
            html={post.content.rendered}
            baseFontStyle={{fontSize: 18}}
            tagsStyles={tagsStyles} 
            html={post.content.rendered} 
            imagesMaxWidth={Dimensions.get('window').width - 30} 
            ignoredStyles={['width', 'height', 'video']}
            onLinkPress={(evt, href) => WebBrowser.openBrowserAsync(href)}
            alterNode = { (node) => {
              const { name, parent } = node;
              // If the tag is <a> and parent is <figcaption>
              if (name === 'a' && getParentsTagsRecursively(parent).indexOf('figcaption') !== -1) {
                  // Change fontSize
                  node.attribs = { ...(node.attribs || {}), style: `fontSize: 14;` };
                  return node;
              }
              }
            }
          />
        </ScrollView>
      ) : (
        <LoadingScreen/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
});
