import React, { Alert, Component } from "react";
import { View,Text,Button,Icon, Container,Content } from 'native-base'

import CustomCard from './CustomCard';
import StoriesTab from "./StoriesTab";



class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return{
      headerTitle: 'Instagram',
    headerLeft: (
      <Button transparent onPress={navigation.getParam('increaseCount')}>
        <Icon name='ios-camera' style={{paddingTop:10, paddingLeft:10, color:'black'}} />
      </Button>
    ),
    headerRight: (
      <Button transparent>
        <Icon name='md-paper-plane' style={{paddingRight:15, color:'black'}}/>
      </Button>
    ),
  };
    }
    


    componentWillMount() {
      this.props.navigation.setParams({ increaseCount: this._increaseCount });
    }
  
    state = {
      count: 0,
    };
  
    /*
    _increaseCount = () => {
      alert("JE")
      const itemsRef = firebase.database().ref('items');
      const item = {
        title: "this.state.currentItem",
        user: "this.state.username"
      }
      itemsRef.push(item)
    };
    */

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
