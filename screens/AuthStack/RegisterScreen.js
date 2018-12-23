import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button, Header, Body, Container, Content, Input, Item,Form} from 'native-base'
import {ImagePicker} from 'expo'
import firebase from '../../src/fire'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: {},
      imageUrl:'',
      email: '',
      password: '',
      isPhotoSelected: false,
    };
  }

  
  createUser = ()  => {
    const userEmail = this.state.email
    const userPassword = this.state.password

    if(userEmail != '' && userPassword != '' && this.state.isPhotoSelected){
      if(userPassword.length > 3){
        firebase
        .auth()
        .createUserWithEmailAndPassword(userEmail,userPassword)
        .then(async (userData) => {
          await this.uploadUserToDB(userData.user.uid)
        })
        .then(user => this.props.navigation.navigate('HomeFeed'))
        .catch(error => this.setState({ errorMessage: error.message }))
      }else{
        console.log("Password length is to short");
      }
    }else{
      console.log("Username or password is empty");
    }  
  }



  _handleImagePicked = async (pickerResult,userID) => {
    let uploadUrl = "-1"
    try {
      if (!pickerResult.cancelled) {
        uploadUrl = await uploadImageAsync(pickerResult.uri, userID);
      }
    } catch (e) {
      console.log(e);
      alert('Upload failed, sorry :(');
    }
    return uploadUrl
  };


  uploadUserToDB = async (userId) => {    
    let imageUri = await this._handleImagePicked(this.state.selectedPhoto,userId)

    firebase.database().ref('users/' + userId).set({
      uid: userId, 
      email: this.state.email,
      imageUrl: imageUri
    });

  }

  _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    this.setState({
      selectedPhoto: pickerResult,
      isPhotoSelected: true
    })
  };


  render() {
    return (
    <Container>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={{textAlignVertical: "center",textAlign: "center",}}>Create your profile</Text>
        </View>
        <View style={styles.box}> 
          <Form>
            <Button onPress={this._pickImage}>
              <Text>Select a photo</Text>
            </Button>
            <Item>
              <Input placeholder="Username" onChangeText={(emailInput) => this.setState({email: emailInput})} />
            </Item>
            <Item>
              <Input placeholder="Password" onChangeText={(passwordInput) => this.setState({password: passwordInput})} />
            </Item>
          </Form>
        </View>
        <View style={styles.box}> 
          <Body>
            <Button onPress={this.createUser}>
              <Text>Sign Up</Text>
            </Button>
          </Body>
        </View>
      </View>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box:{ 
    width: '90%',
  }
})


async function uploadImageAsync(uri,uid) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await urlToBlob(uri)

  const ref = firebase
    .storage()
    .ref('user-profile-image/')
    .child(uid);
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