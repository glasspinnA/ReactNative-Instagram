import React, { Component } from "react";
import { View,Text,Button,Icon, Container,Content } from 'native-base'

import CustomCard from './CustomCard';
import StoriesTab from "./StoriesTab";

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Instagram',
    headerLeft: (
      <Button transparent>
        <Icon name='ios-camera' style={{paddingTop:10, paddingLeft:10, color:'black'}} />
      </Button>
    ),
    headerRight: (
      <Button transparent>
        <Icon name='md-paper-plane' style={{paddingRight:15, color:'black'}}/>
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
