import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {Button, Item, Input, Content, Container, Left, Right,Body, Thumbnail, List, ListItem, Image } from 'native-base'
import Fire from './../src/Fire'

class CommentScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        commentText: '',
        currentUserId:'',
        currentUserUsername:'',
        currentUserImageUrl:'',
        postId: '',
        post:{},
        statusArray: [],
    };
  }

    componentDidMount(){ 

        const { navigation } = this.props;
        const postObject = navigation.getParam('postObject', 'NO-POST-OBJECT')
        
        const postId = navigation.getParam('postId', 'NO-POST-ID');
        const userUsername = navigation.getParam('userUsername', 'NO-POST-ID');
        const userProfileImageUrl = navigation.getParam('userProfileImageUrl', 'NO-POST-ID');

        this.setState({
            post: postObject
        })

        this.fetchComments(postObject.postId)
        
    }

    fetchComments = async (postId) =>{
        let responseArray = await Fire.shared.fetchComments(postId)
        

      this.setState({
        //Reverse so newst post is on top
        statusArray: responseArray.reverse()
      })
    
    }


    postComment = () =>{
        const commentText = this.state.commentText
        if(commentText.length > 0){
            Fire.shared.postComment(this.state.post.id,commentText)
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
    
                </Body>
                
                <Right>
                    
                <Text>{value.username}</Text>
                    <Text note>{value.commentText}</Text>
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
