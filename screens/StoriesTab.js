import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {Thumbnail} from 'native-base';
export default class StoriesTab extends Component {

  render() {
    return (
      <View>
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 5,
                paddingStart: 2,
                paddingEnd: 2,
            }}
        >
        <Thumbnail source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} style={[styles.stories]} />
        <Thumbnail source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} style={[styles.stories]} />
        <Thumbnail source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} style={[styles.stories]} />
        <Thumbnail source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} style={[styles.stories]} />
        <Thumbnail source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} style={[styles.stories]} />
            <Thumbnail source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} style={[styles.stories]} />
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    stories: {
        marginHorizontal: 5,
        borderColor: 'red',
        borderWidth: 2,
    },
  });