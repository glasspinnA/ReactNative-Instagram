import React, { Component } from "react";
import { View,Text,Button,Icon, Container,Content } from 'native-base'

import CustomCard from './CustomCard';
import StoriesTab from "./StoriesTab";

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Instagram',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerLeft: (
      <Icon name='ios-camera' style={{paddingLeft:15}} />
    ),
    headerRight: (
      <Button>
        <Icon name='md-paper-plane' style={{paddingRight:15}}/>
      </Button>
    ),
  };

  render() {
    return (
      <Container>
        <Content>
          <StoriesTab />
          <CustomCard/>
          <CustomCard/>
        </Content>
      </Container>
    );
  }
}


export default HomeScreen;
