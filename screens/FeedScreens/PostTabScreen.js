import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from './../../src/fire'
import { Container, Button, Item, Input } from 'native-base';
import uuid from 'uuid';
import {ImagePicker, Permissions} from 'expo'

export default class PostTabScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: {},
      isPhotoSelected: false,
      userUsername: '',
      userProfileImage: '',
      postText: '',
    };
  }

  async componentDidMount(){
    await this.getCurrentUserId()
    this.getCurrentUsername()
    
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }


  getCurrentUserId = () => {
    let user = firebase.auth().currentUser

    if(user){
      this.setState({
        currentUserId: firebase.auth().currentUser.uid
      })
    }else{
      console.log("No logged in user");
    }
  }

  getCurrentUsername = () => {
    var ref = firebase.database().ref('users/').child(this.state.currentUserId)
    ref.once("value", (snapshot => {
      let responseObject = snapshot.val();
      
      this.setState({
        userUsername: responseObject.username,
        userProfileImage: responseObject.imageUrl
      })
      

    }))
  }


  uploadImage = async () => {
    let selectedPicture = this.state.selectedPhoto
    if(this.state.isPhotoSelected){
      try {
        if (!selectedPicture.cancelled) {
          uploadUrl = await uploadImageAsync(selectedPicture.uri);

          firebase.database().ref('posts/').child(uuid.v4()).set({
            uid: this.state.currentUserId,
            timestamp: new Date().getTime(),
            imageUrl: uploadUrl,
            postText: this.state.postText,
            username: this.state.userUsername,
            profileImageUrl: this.state.userProfileImage,
          })
          .then(() => {
            this.setState({
              isPhotoSelected: false,
            })
          })
          .catch((error) => {
            alert(error)
          })
        }
      } catch (e) {
        console.log(e);
        alert('Upload failed, sorry :(');
      }
    }
  }
  
  selectImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    this.setState({
      selectedPhoto: pickerResult,
      isPhotoSelected: true,
    })
  };

  
  cameraSelect = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.4
    });

    
    this.setState({
      selectedPhoto: pickerResult,
      isPhotoSelected: true,
    })
  };


  render() {
    return (
      <Container>
        <View>
          <Text> textInComponent </Text>
        </View>

        <View>
          <Button onPress={this.selectImage}>
            <Text>Select Picture</Text>
          </Button>
        </View>
        
        <View>
          <Button onPress={this.cameraSelect}>
            <Text>Select Camera</Text>
          </Button>
        </View>

        <Item>
          <Input 
            placeholder={'Enter your text'} 
            onChangeText={(postTextInput) => this.setState({postText: postTextInput})} />
        </Item>

        <View>
          <Button onPress={() => this.uploadImage()}>
            <Text>Upload</Text>
          </Button>
        </View>

      </Container>
    );
  }
}



async function uploadImageAsync(uri) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await urlToBlob(uri)

  const ref = firebase
    .storage()
    .ref('posts/')
    .child(uuid.v4());
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
}


function urlToBlob(url) {
  return new Promise((resolve, reject) => {
    
    var xhr = new XMLHttpRequest();
    xhr.onerror = reject;
    
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        resolve(xhr.response);
      }
    };

    xhr.open('GET', url);
    xhr.responseType = 'blob'; // convert type
    
    xhr.send();
  })
}