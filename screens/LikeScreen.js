import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";


import firebase from 'firebase'
//import Post from '../src/custom_objects/post'

const config = {
  apiKey: "AIzaSyAXsRxyvpSGxXY9nv_ZvJYVvBKbCZQFFbM",
  authDomain: "instagram-react-f8775.firebaseapp.com",
  databaseURL: "https://instagram-react-f8775.firebaseio.com",
  projectId: "instagram-react-f8775",
  storageBucket: "instagram-react-f8775.appspot.com",
  messagingSenderId: "108838635737"
};

firebase.initializeApp(config)

class LikeScreen extends Component {
  constructor() {
    super();
    this.getFromFirebase()                   
  }

  getFromFirebase(){
    var ref = firebase.database().ref('posts/-LU7M8f5YtlL2H00YA5P')
    ref.on("value", function(snapshot){
      // Contains all data from Firebase
      var data = snapshot.val();
      // Has customer name
      var userId = data.userId;
      
      console.log(userId);
      

      });
  }

  firebaseTalk = () => {
    const itemsRef = firebase.database().ref('posts');

    let posts = {
      postText: '',
      imageUri: '',
      userId: 13,
      timestamp:0,
    }

    itemsRef.set(posts)
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Like!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.firebaseTalk()}
        />
      </View>
    );
  }
}

export default LikeScreen