import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {Button, Header, Body, Container, Content, Input, Item,Form, Thumbnail, Label} from 'native-base'
import {ImagePicker} from 'expo'
import Fire from '../../src/Fire'

export default class LoginScreen extends Component {
  /* 
  * TODO: Add Username input field
  */

  static navigationOptions = {
    title: 'Create a user',
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: {},
      imageUrl:'',
      email: '',
      password: '',
      username: 'göran',
      isPhotoSelected: false,
    };
  }


  createUser = ()  => {
    const selectedPhoto = this.state.selectedPhoto

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,   
      photo: selectedPhoto
    }

    if(user.email != '' && user.password != '' && this.state.isPhotoSelected){
      if(user.password.length > 3){
        
        if(Fire.shared.createUser(user)){
          this.props.navigation.navigate('HomeFeed')
        }
      }else{
        console.log("Password length is to short");
      }
    }else{
      console.log("Username or password is empty");
    }  
  }

  _pickImage = async () => {
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


  render() {
    return (
    <Container>
      <View style={styles.container}>
        <View style={[styles.box, styles.imageBox]}>
            <TouchableWithoutFeedback onPress={this._pickImage}>
              <View>
                <View style={{position:'relative', marginTop:50}}>
                  <Text style={{textAlignVertical: "center",textAlign: "center"}}>Select Photos</Text>
                </View>
                <Thumbnail large source = {{uri:this.state.selectedPhoto.uri}}/>  
              </View>
            </TouchableWithoutFeedback>
        </View>
        <View style={styles.box}> 
          <Form>
            <Item rounded style={{marginBottom:30}}>
              <Input placeholder="Username" onChangeText={(emailInput) => this.setState({email: emailInput})} />
            </Item>
            <Item rounded>
              <Input placeholder="Password" secureTextEntry={true} onChangeText={(passwordInput) => this.setState({password: passwordInput})} />
            </Item>
          </Form>
        </View>
        <View style={styles.box}> 
          <Body>
            <Button bordered dark onPress={this.createUser} style={{padding:30}}>
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
  imageBox:{
    width:120,
    height:120,
    borderRadius: 120/2,
    borderWidth: 1,
    borderColor: 'black',
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