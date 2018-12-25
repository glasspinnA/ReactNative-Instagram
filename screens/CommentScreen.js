import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button, Item, Input, Content, Container, Left, Right,Body, Thumbnail, List, ListItem, Image } from 'native-base'
import firebase from './../src/fire'

class CommentScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        commentText: '',
        currentUserId:'',
        currentUserUsername:'',
        currentUserImageUrl:'',
        postId: '',
        statusArray: [],
    };
  }

    componentDidMount(){ 

        const { navigation } = this.props;
        const postId = navigation.getParam('postId', 'NO-POST-ID');
        const userUsername = navigation.getParam('userUsername', 'NO-POST-ID');
        const userProfileImageUrl = navigation.getParam('userProfileImageUrl', 'NO-POST-ID');

        this.setState({
            postId: postId,
            currentUserUsername: userUsername,
            currentUserImageUrl: userProfileImageUrl,
        })

        this.fetchComments(postId)
        
    }

    fetchComments = (postId) =>{
        firebase.database().ref('post-comments-by-user')
        .child(postId)
            .once('value',snapshot =>{
      let statusItems = snapshot.val();
      console.log(statusItems);
      
      let newStatusArray = [];

      for (let item in statusItems) {
        newStatusArray.push({
          id: item,
          postText: statusItems[item].comment,
          profileImageUrl: statusItems[item].profileImageUrl,
          timestamp: statusItems[item].timestamp,
          username: statusItems[item].username,
        });
      } 

      this.setState({
        //Reverse so newst post is on top
        statusArray: newStatusArray.reverse()
      })
    })
    }


    postComment = () =>{
        const commentText = this.state.commentText
        if(commentText.length > 0){
            firebase.database().ref('post-comments-by-user/' + this.state.postId).push({
                timestamp: new Date().getTime(),
                comment: commentText,
                username: this.state.currentUserUsername,
                profileImageUrl: this.state.currentUserImageUrl,
                uid: this.state.currentUserId,
            })

            this.forceUpdate();
        }
    }

    renderComments = () => {
        return this.state.statusArray.map((value,index) => {
          return(
                <ListItem key={index} avatar>

                <Left>
                    <Thumbnail source={{uri:value.profileImageUrl}} />
                </Left>
                <Body>
                    <Text>{value.username}</Text>
                    <Text note>{value.postText}</Text>
                </Body>
                <Right>
                    <Text note>{value.timestamp}</Text>
                </Right>
                </ListItem>
          )        
        })
      }

  render() {
    return (
        <Container>
            <Content>
                <List>
                    {this.renderComments()}
                </List>
            </Content>
            <Content>
                <View style={{flexDirection: 'row',}}>
                    <Item style={{flex:3, justifyContent:'center', height:35, margin:5}}>
                        <Input 
                            placeholder="Enter your comment" 
                            onChangeText={(commentInput) => 
                                this.setState({commentText: commentInput})
                            } />
                    </Item>
                    <Button onPress={this.postComment} style={{flex:1, justifyContent:'center', height:35, margin:5}}>
                        <Text>Post Comment</Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
  }
}

export default CommentScreen