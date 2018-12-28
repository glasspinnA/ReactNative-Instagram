import React, { Component } from 'react';
import { View, Text } from 'react-native';


import * as firebase from 'firebase'

class LoadingScreen extends Component {

    componentDidMount(){
      if (!firebase.apps.length) {
        firebase.initializeApp({
          apiKey: "AIzaSyAXsRxyvpSGxXY9nv_ZvJYVvBKbCZQFFbM",
          authDomain: "instagram-react-f8775.firebaseapp.com",
          databaseURL: "https://instagram-react-f8775.firebaseio.com",
          projectId: "instagram-react-f8775",
          storageBucket: "instagram-react-f8775.appspot.com",
          messagingSenderId: "108838635737"
        })
     }

      
        firebase.auth().onAuthStateChanged(user => {            
          this.props.navigation.navigate(user ? 'Tabs' : 'Login')
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