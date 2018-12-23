import React, { Component } from 'react';
import { View, Text } from 'react-native';

import fire from '../src/fire'

class LoadingScreen extends Component {

    componentDidMount(){
        fire.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'HomeFeed' : 'Login')
        })
    }

  render() {
    return (
      <View>
        <Text> Loading Screen </Text>
      </View>
    );
  }
}

export default LoadingScreen