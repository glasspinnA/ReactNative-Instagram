import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button, Header, Body, Container, Content, Input, Item,Form} from 'native-base'
import firebase from '../../src/fire'
import { LinearGradient } from 'expo';

class SignInScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }
  
  
  static navigationOptions = {
    title: 'Log in',
  };

  login = () =>{
    let userEmail = this.state.email
    let userPassword = this.state.password

    if (userEmail != '' && userPassword != ''){
      firebase.auth().signInWithEmailAndPassword(userEmail,userPassword)
      .catch((error) => {
        alert(error);
      })
    }else{
      alert("Email or password is empty")
    }
  
  }

  render() {
    return (
          <Container>
            <Header />
            <LinearGradient colors={['#285aeb', '#e249bd', '#ff7387', '#ffb771','#fdf497']} start={[0.1,0.1]} style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top:0
      }}>

              <View style={styles.container}>
                <View style={styles.box}> 
                  <Form>
                    <Item rounded style={{marginBottom:30, backgroundColor:'white'}}>
                      <Input placeholder="Email" onChangeText={(emailInput) => this.setState({email: emailInput})} />
                    </Item>
                    <Item rounded style={{backgroundColor: 'white'}}>
                      <Input placeholder="Password" secureTextEntry={true} onChangeText={(passwordInput) => this.setState({password: passwordInput})} />
                    </Item>
                  </Form>
                </View>
                <View style={styles.box}> 
                    <Button rounded light onPress={this.login} style={styles.buttonStyle}>
                      <Text>Sign Up</Text>
                    </Button>
                </View>
                <View style={styles.box}> 
                    <Button rounded light style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Register')}>
                      <Text> Already have an account? </Text>
                    </Button>
                </View>
              </View>
              
            </LinearGradient>
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
    color:'white', 
    width: '90%',
  },
  buttonStyle:{
    padding:20,
  }
})

export default SignInScreen
