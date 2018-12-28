import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,Dimensions } from 'react-native';
import Fire from '../../src/Fire'
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
      postText: '',
      userObject: {},
    }

  }

  async componentDidMount(){
    this.props.navigation.setParams({ cameraSelect: this._cameraSelect, imageSelect: this._imageSelect });

    await this.getUserInfo()

    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
  }

  getUserInfo = async() => {
    this.setState({
      userObject: await Fire.shared.getUser(),
    })
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

/*
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
*/

  uploadImage = async () => {
    let selectedPicture = this.state.selectedPhoto
    let resObj = await Fire.shared.getUser()
    console.log("UPLOAD_FUN 1 " + resObj[0].uid);
    
    if(this.state.isPhotoSelected){
      try{

        if(!selectedPicture.cancelled){
          uploadUrl = await Fire.shared.uploadImageAsync(selectedPicture.uri,resObj[0].uid,true);

          if(this.state.postText.length > 1){
            Fire.shared.uploadImageToDB(uploadUrl, this.state.postText, resObj)
          }else{
            console.log('TOO SHORT TEXT');
          }

        }else{
          console.log("PHOTO CANCALLED");
        }

      }catch(error){
        alert("Problem with uploading")
        console.log(error);
      }
    }else{
      console.log('NO PHOTO SELECTED');
    }
  }
    
    
/*
    if(this.state.isPhotoSelected){
      try {
        if (!selectedPicture.cancelled) {
          uploadUrl = await Fire.shared.uploadImageAsync(selectedPicture.uri);

          if(this.state.postText.length > 1){
              console.log("UPLOAD_FUN " + resObj);

              Fire.shared.uploadImageToDB(uploadUrl, this.state.postText, resObj)
              
              .then(() => {
                this.setState({
                  isPhotoSelected: false,
                })
              })
              */
            

            /*
            firebase.database().ref('user-posts/').child(this.state.currentUserId).push({
              uid: this.state.currentUserId,
              imageUrl: uploadUrl,
              timestamp: new Date().getTime(),
            })


            firebase.database().ref('posts/').child(uuid.v4()).set({
              uid: this.state.currentUserId,
              timestamp: new Date().getTime(),
              imageUrl: uploadUrl,
              postText: this.state.postText,
              username: this.state.userUsername,
              profileImageUrl: this.state.userProfileImage,
              postId: uuid.v4(),
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
  */

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
          <Image source={{uri: this.state.selectedPhoto.uri}} resizeMode='cover' style={styles.imageBox}/>
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
    height:350, 
    width:350,
    flex:1,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20,
  },
})
