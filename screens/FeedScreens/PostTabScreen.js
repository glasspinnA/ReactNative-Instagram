import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';
import firebase from './../../src/fire'
import { Container, Button, Item, Input, Icon, Content } from 'native-base';
import uuid from 'uuid';
import {ImagePicker, Permissions} from 'expo'


/*
* TODO:
* Fix better UI 
*/ 

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
    this.props.navigation.setParams({ cameraSelect: this._cameraSelect, imageSelect: this._imageSelect });

    await this.getCurrentUserId()
    this.getCurrentUsername()
    
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
      headerTitle: 'Create A Post',
      headerLeft: (
        <Button transparent onPress={() => params.cameraSelect()}>
          <Icon name='md-camera' style={{paddingTop:10, paddingLeft:10, color:'black'}} />
        </Button>
        
      ),
      headerRight: (
        <Button transparent onPress={() => params.imageSelect()}>
          <Icon name='md-images' style={{paddingTop:10, paddingLeft:10, color:'black'}} />
        </Button>
      ),
    }
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

          if(this.state.postText.length > 1){

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

          }else{
            alert("Enter a text")
          }

        }
      } catch (e) {
        console.log(e);
        alert('Upload failed, sorry :(');
      }
    }
  }
  
  _imageSelect = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    this.setState({
      selectedPhoto: pickerResult,
      isPhotoSelected: true,
    })
  };

  
  _cameraSelect = async () => {
    let pickerResult = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3
    });

    
    this.setState({
      selectedPhoto: pickerResult,
      isPhotoSelected: true,
    })
  };



  render() {
    return (
      <Container>
        <Content>
          <Image source={{uri: this.state.selectedPhoto.uri}} style={styles.imageBox}/>
          <Item>
            <Input 
              placeholder={'Enter your text'} 
              onChangeText={(postTextInput) => this.setState({postText: postTextInput})} />
          </Item>
          
        <View>
          <Button light rounded onPress={() => this.uploadImage()} style={styles.customButton}>
            <Text>Upload</Text>
          </Button>
        </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  customButton:{
    padding:20,
  },
  imageBox:{
    height:200, 
    width:200,
    flex:1,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
  },
})



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