import React, { Component } from 'react';
import {View,Text,Image, StyleSheet} from 'react-native';
import {Card,CardItem,Thumbnail,Button,Icon,Body,Left,Right} from 'native-base';

class CustomCard extends React.Component {


  render() {
    return (
      <Card>
        <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} style={[styles.posterPic]} />
              <Body>
                <Text>Username</Text>
                <Text note>Time and date</Text>
              </Body>
            </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} style={{height:200, width:null, flex:1}}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon name="md-heart-empty" style={[styles.cardButtons]}></Icon>
            </Button>
            <Button transparent>
              <Icon name="md-chatboxes" style={[styles.cardButtons]}></Icon>
            </Button>
            <Button transparent>
              <Icon name="md-paper-plane" style={[styles.cardButtons]}></Icon>
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


const styles = StyleSheet.create({
  posterPic: {
    marginLeft: -10,
  },
  cardButtons: {
    paddingTop: 5,
    fontSize: 30,
    color: 'black',
  },
});

export default CustomCard;
