import React from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { View } from '../components/Themed';

export default function LoadingScreen() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[Colors[colorScheme].tint]}
            refreshing={true}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});
  