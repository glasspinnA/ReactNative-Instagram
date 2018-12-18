import React, { PureComponent } from 'react';
import {  View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import HeaderRow from './HeaderRow';

class ProfileScreen extends PureComponent {

    static navigationOptions = {
        headerTitle: 'Username',
      };


  render() {
    return (
      <Container>
          <Content>
              <HeaderRow/>
          </Content>
      </Container>
    );
  }
}



export default ProfileScreen
