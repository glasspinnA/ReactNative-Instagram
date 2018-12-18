import React, { Component } from 'react';
import {View,Text,Image} from 'react-native';
import {Card,CardItem,Thumbnail,Button,Icon,Body,Left,Right} from 'native-base';

class CustomCard extends React.Component {


  render() {
    return (
      <Card>
        <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://i.chzbgr.com/full/7345954048/h7E2C65F9/'}} />
              <Body>
                <Text>Username</Text>
                <Text note>Time and date</Text>
              </Body>
            </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} style={{height:200, width:null, flex:1}}/>
        </CardItem>
        <CardItem style={{height:5}}>
          <Left>
            <Button transparent>
              <Icon name="md-heart-empty" style={{color:'black'}}></Icon>
            </Button>
            <Button transparent>
              <Icon name="md-chatboxes" style={{color:'black'}}></Icon>
            </Button>
            <Button transparent>
              <Icon name="md-paper-plane" style={{color:'black'}}></Icon>
            </Button>
          </Left>
        </CardItem>
        <CardItem style={{height: 5 }}>
            <Text>Number of Likes</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{fontWeight: 'bold'}}>
              Usernam
            </Text>
            <Text>
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac felis at urna hendrerit dignissim. Sed eget tellus at eros gravida elementum a quis tortor. Aliquam ultricies sed mi sit amet vehicula. Nulla interdum euismod fermentum. Nulla sit amet justo augue. Praesent feugiat eleifend nisi, ac placerat ligula tempus dictum. Etiam efficitur fermentum lectus eget mattis. Praesent tempus hendrerit nisi. Nulla quis consequat augue, eget aliquet risus. Sed nec lectus bibendum, blandit purus ac, ultrices augue. In quis nunc at justo facilisis vehicula.'
            </Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

export default CustomCard;
