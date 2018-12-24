import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { View, Button, Item, Input, Content, Container, Left, Right,Body, Thumbnail } from 'native-base'

class CommentScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
        commentText: '',
    };
  }

  componentDidMount(){
    const { navigation } = this.props;
    const postId = navigation.getParam('postId', 'NO-POST-ID');


      this.fetchComments(postId)
  }

  fetchComments = (postId) =>{
      alert(postId)
  }

  render() {
    return (
        <Container>
            <Content>
                <List>
                    <Left>
                        <Thumbnail source={{ uri: 'Image URL' }} />
                    </Left>
                    <Body>
                        <Text>Kumar Pratik</Text>
                        <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                        <Text note>3:43 pm</Text>
                    </Right>
                </List>
            </Content>
            <Content>
                <Left>
                    <Item>
                        <Input 
                            placeholder="Enter your comment" 
                            onChangeText={(commentInput) => 
                                this.setState({commentText: commentInput})
                            } />
                    </Item>
                </Left>
                <Right>
                    <Button onPress={this.postComment}>
                        <Text>Post Comment</Text>
                    </Button>
                </Right>
            </Content>
        </Container>
    );
  }
}

export default CommentScreen
