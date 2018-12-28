import React, { Component } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import {Button, Item, Input, Content, Container, Left, Right,Body, Thumbnail, List, ListItem, } from 'native-base'
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

  
    static navigationOptions = ({ navigation }) => {
        return {
          title: 'Comments',
        };
      };
      

    componentDidMount(){ 
        const { navigation } = this.props;
        const postObject = navigation.getParam('postObject', 'NO-POST-OBJECT')
        
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
                        <Text>{value.username}</Text>
                        <Text note>{value.commentText}</Text>
                    </Body>
                    <Right>
                        <Text note>{value.timestamp}</Text>
                    </Right>
                </ListItem>
            )        
        })
      }

      /*


      
            
      */

  render() {
    return (
        <View style={styles.container}>
            
            <View style={styles.childrenBox}>
                <List>
                    {this.renderComments()}
                </List>            
            </View>
            
            <View style={styles.childrenBox}>
                <View style={{flexDirection:'row'}}>
                    <Body>
                        <Item rounded>
                            <Input 
                                placeholder="Enter your comment" 
                                onChangeText={(commentInput) => 
                                    this.setState({commentText: commentInput})
                                }
                            />   
                        </Item>
                    </Body>
                            
                    <Button info rounded onPress={this.postComment} style={{marginLeft:10, padding:20}}>
                        <Text>Post</Text>
                    </Button>
                </View>
            </View>
            
        </View>
    );
  }
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
    },
    childrenBox:{
        padding:10,
        width:'100%',
    }
})


export default CommentScreen
