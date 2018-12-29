import React, { Component } from 'react';
import { View, Text, Image, StyleSheet,} from 'react-native';
import Fire from '../../src/Fire'
import {Button, Item, Input, Icon, Body } from 'native-base';
import {ImagePicker, Permissions} from 'expo'

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

  getUserInfo = async() => {
    this.setState({
      userObject: await Fire.shared.getUser()
    })
  }

  uploadImage = async () => {
    let selectedPicture = this.state.selectedPhoto
    let resObj = await Fire.shared.getUser()
    
    if(this.state.isPhotoSelected){
      try{

        if(!selectedPicture.cancelled){
          uploadUrl = await Fire.shared.uploadImageAsync(selectedPicture.uri,resObj[0].uid,true)

          if(this.state.postText.length > 1){
            Fire.shared.uploadImageToDB(uploadUrl, this.state.postText, resObj)
            
            this.setState({postText:'', selectedPhoto:{} })
          }else{
            alert('TOO SHORT TEXT');
          }

        }else{
          alert("PHOTO CANCALLED");
        }

      }catch(error){
        alert("Problem with uploading")
        console.log(error);
      }
    }else{
      alert('NO PHOTO SELECTED');
    }
  }
    

  selectPhoto = async (isCameraSelected) =>{
    let pickerResult
    if(isCameraSelected){
      pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3
      });
    }else{
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.3,
      });
    }

    this.setState({
      selectedPhoto: pickerResult,
      isPhotoSelected: true,
    })

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
      
      <View style={styles.container}>
        <View style={styles.childrenBox}>
          <Image style={styles.imageBox} source={{uri: this.state.selectedPhoto.uri}} resizeMode='cover' />
        </View>
        <View style={styles.childrenBox}>
          <View style={{flexDirection:'row'}}>
            <Body>
              <Item rounded>
                <Input 
                  value={this.state.postText}
                  placeholder={'Enter your text'} 
                  onChangeText={(postTextInput) => this.setState({postText: postTextInput})} />
              </Item>
            </Body>
            <Button light rounded onPress={() => this.uploadImage()}  style={styles.customButton}>
              <Text>Upload</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    justifyContent:'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flex:1,    
  },
  childrenBox:{
    alignItems: 'center',
    alignContent: 'center',
    width:'100%',
    margin: 10,
  },
  customButton:{
    padding:20,
  },
  imageBox:{
    height:250, 
    width:250,
    borderColor: 'black',
    borderWidth: 2,
    alignItems:'center',
    borderRadius: 20,
  },
})
