import React, { Component } from "react";
import { View,Text,Button,Icon } from 'native-base'
import CustomCard from './screens/customCard'

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Instagram',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerLeft: (
      <Icon name='ios-camera' style={{paddingLeft:15}} />
    ),
    headerRight: (
      <Button>
        <Icon name='md-paper-plane' style={{paddingRight:15}}/>
      </Button>
    ),
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Like')}
        />
      </View>
      <
    );
  }
}


export default HomeScreen;
