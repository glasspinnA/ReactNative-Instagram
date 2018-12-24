import React, { Component } from 'react';
import {View,Text,Image, StyleSheet} from 'react-native';
import {Card,CardItem,Thumbnail,Button,Icon,Body,Left,Right} from 'native-base';

class CustomCard extends React.Component {


  render() {
    return (
      <Card>
        <CardItem>
            <Left>
              <Thumbnail source={{uri: this.props.profileImageUrl}} style={[styles.posterPic]} />
              <Body>
                <Text>{this.props.username}</Text>
                <Text note>{this.props.timestamp}</Text>
              </Body>
            </Left>
        </CardItem>
        <CardItem cardBody>
          <Image source={{uri: this.props.imageUrl}} style={{height:200, width:null, flex:1}}/>
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
            <Text style={{fontWeight: 'bold'}}> {this.props.username} </Text>
            <Text>{this.props.postText}</Text>
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
