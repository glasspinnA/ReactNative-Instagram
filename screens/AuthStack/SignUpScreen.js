import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button, Header, Body, Container, Content, Input, Item,Form} from 'native-base'
import {ImagePicker, FileSystem} from 'expo'
import fire from '../../src/fire'

class SignInScreen extends Component {

  
  static navigationOptions = () => {
    return{
      header: null,
    };  
  }

  createUser = () => {
    fire
    .auth()
    .createUserWithEmailAndPassword("jonna@gmail.com","jonna123")
    .then(user => this.props.navigation.navigate('HomeFeed'))
    .catch(error => this.setState({ errorMessage: error.message }))
  }

/*
  uploadPhotoToDb = () =>{
    const ref = fire.storage().ref();
    const file = Asset.fromModule(require('../../assets/jonna2.jpg'))


    var metadata = {
      contentType: 'image/jpg'
    };

    var uploadTask = ref.child('image/' + file.name).put(file, metadata);
   
  }
  

  uploadUserToDb = (uId) => {
    const itemsRef = fire.database().ref('user');

    let user = {
      userId: uId,
      profilePicUri: 'www.sdmamds.com',
      username: 'Jonna'
    }

    itemsRef.set(user)
  }
*/
  render() {
    return (
          <Container>
            <Header />
            <View style={styles.container}>
              <View style={styles.box}> 
                <Text style={{textAlignVertical: "center",textAlign: "center",}}>Instagram</Text>
              </View>
              
              <View style={styles.box}> 
                <Form>
                  <Item>
                    <Input placeholder="Username" />
                  </Item>
                  <Item>
                    <Input placeholder="Password" />
                  </Item>
                </Form>
              </View>
              <View style={styles.box}> 
                <Body style={{textAlignVertical: "center",textAlign: "center",}}>
                  <Button bordered dark style={{padding:10}}>
                    <Text> Login </Text>
                  </Button>
                </Body>
              </View>
              
              <View style={styles.box}> 
                <Body style={{textAlignVertical: "center",textAlign: "center",}}>
                  <Button bordered  dark style={{padding:10}} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text> Already have an account? </Text>
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

export default SignInScreen
