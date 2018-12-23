import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button, Header, Body, Container, Content, Input, Item,Form} from 'native-base'
import {ImagePicker, FileSystem} from 'expo'
import firebase from '../../src/fire'
import uuid from 'uuid';

import { firstFromTime } from 'uuid-js';

class SignInScreen extends Component {

  
  static navigationOptions = () => {
    return{
      header: null,
    };  
  }

  login = () =>{
    alert("Login")
  }

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
                <Body>
                  <Button borderd dark onPress={this.login}>
                    <Text>Sign Up</Text>
                  </Button>
                </Body>
              </View>
              <View style={styles.box}> 
                <Body>
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
