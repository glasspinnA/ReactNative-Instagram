import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Button, Header, Body, Container, Content, Input, Item,Form} from 'native-base'
import firebase from '../../src/fire'
import LinearGradient from 'react-native-linear-gradient';

class SignInScreen extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }
  
  static navigationOptions = () => {
    return{
      header: null,
    };  
  }

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
              <View style={styles.container}>
                <View style={styles.box}>
                  <Text style={{textAlignVertical: "center",textAlign: "center",}}>Instagram</Text>
                </View>
                <View style={styles.box}> 
                  <Form>
                    <Item rounded style={{marginBottom:30}}>
                      <Input placeholder="Email" onChangeText={(emailInput) => this.setState({email: emailInput})} />
                    </Item>
                    <Item rounded>
                      <Input placeholder="Password" secureTextEntry={true} onChangeText={(passwordInput) => this.setState({password: passwordInput})} />
                    </Item>
                  </Form>
                </View>
                <View style={styles.box}> 
                  <Body>
                    <Button bordered dark onPress={this.login} style={styles.buttonStyle}>
                      <Text>Sign Up</Text>
                    </Button>
                  </Body>
                </View>
                <View style={styles.box}> 
                  <Body>
                    <Button bordered dark style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('Register')}>
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
  },
  buttonStyle:{
    padding:20,
  }
})

export default SignInScreen
