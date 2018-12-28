import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    FlatList,
    List,
} from "react-native";
import firebase from '../../src/Fire'
import {Content, Container, Image} from 'native-base'

class LikeScreen extends Component {
  

  componentDidMount(){
    this.getFromFirebase()
  }

  getFromFirebase(){
    var ref = firebase.database().ref('posts')
    ref.on("value", function(snapshot){
      let responseArray = snapshot.val();
      
      console.log(responseArray);
      

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

  handleEnd = () => {
    
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            <FlatList 
              onEndReached = {this.handleEnd}
              onEndReachedThreshold={0}
            >

            </FlatList>
          </List>
        </Content>
      </Container>
    )
  }
}

export default LikeScreen