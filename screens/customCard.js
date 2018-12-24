import React, { Component } from 'react';
import {View,Text,Image, StyleSheet} from 'react-native';
import {Card,CardItem,Thumbnail,Button,Icon,Body,Left,Right} from 'native-base';
import { withNavigation } from 'react-navigation';


class CustomCard extends React.Component {

  createComment = () => {
    alert("Comment")
  }

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
          <Image source={{uri: this.props.imageUrl}} resizeMode='contain' style={{height:300, width:null, flex:1}}/>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon name="md-heart-empty" style={[styles.cardButtons]}></Icon>
            </Button>
            <Button 
              transparent 
              onPress={() => {
                this.props.navigation.navigate('Comment', {
                  postId:this.props.postId
                })
              }} >
              <Icon name="md-chatboxes" style={[styles.cardButtons]}></Icon>
            </Button>
            <Button transparent>
              <Icon name="md-paper-plane" style={[styles.cardButtons]}></Icon>
            </Button>
          </Left>
        </CardItem>
        <CardItem style={{height: 3 }}>
            <Text>Number of Likes</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{fontWeight: 'bold'}}>{this.props.username}</Text>
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

export default withNavigation(CustomCard);
