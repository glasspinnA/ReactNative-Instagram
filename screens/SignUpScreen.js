import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button} from 'native-base'

import fire from '../src/fire'

class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  createUser = () => {
    fire
    .auth()
    .createUserWithEmailAndPassword("jonna@gmail.com","jonna123")
    .then(user => this.props.navigation.navigate('Home'))
    .catch(error => this.setState({ errorMessage: error.message }))
  }

  render() {
    return (
      <View>
        <Text> Sign In </Text>
        <Button onPress={this.createUser}><Text>Sign Up</Text></Button>
        
        <Button onPress={() => this.props.navigation.navigate('Login')}><Text>Already Have An Account?</Text></Button>
      </View>
    );
  }
}

export default SignInScreen
