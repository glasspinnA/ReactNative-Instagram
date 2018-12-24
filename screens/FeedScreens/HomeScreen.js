import React, { Alert, Component } from "react";
import { View,Text,Button,Icon, Container,Content } from 'native-base'

import CustomCard from '../CustomCard';
import StoriesTab from "../StoriesTab";
import firebase from "../../src/fire";



/*
* TODO: 
* Be able to comment on a post 
* Be a to like a post
*/

class HomeScreen extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
      statusArray: [],
    }

  }

  componentDidMount(){
    this.fetchPostsFromDB()
    this.props.navigation.setParams({ logout: this._logout });
  }

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
      headerTitle: 'Instagram',
      headerLeft: (
        <Button transparent onPress={() => params.logout()}>
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

  _logout = () => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        firebase.auth().signOut()
        alert("Log out")
      }
    })
  }

  /*
  * Method for fetching status posts from database
  */
  fetchPostsFromDB = () =>{
    firebase.database().ref('posts')
    .orderByChild('timestamp')
    .once('value',snapshot =>{
      let statusItems = snapshot.val();
      let newStatusArray = [];

      for (let item in statusItems) {
        newStatusArray.push({
          id: item,
          postText: statusItems[item].postText,
          imageUrl: statusItems[item].imageUrl,
          profileImageUrl: statusItems[item].profileImageUrl,
          timestamp: this.convertTimestamp(statusItems[item].timestamp),
          username: statusItems[item].username,
        });
      } 

      this.setState({
        //Reverse so newst post is on top
        statusArray: newStatusArray.reverse()
      })
    })
  }

  convertTimestamp = (timestamp) =>{
    let date = new Date(timestamp)

    let timeString = (date.getHours() + ":" + 
                      date.getMinutes() + " " + 
                      date.getDate() + "/"+ 
                      date.getMonth() + "/" + 
                      date.getFullYear()).toString()

    return timeString
  }


  /*
  * Method for rendering each fetched post
  */
  renderPosts = () => {
    return this.state.statusArray.map((value,index) => {
      return(        
        <CustomCard 
        key={index} 
        username={value.username} 
        timestamp={value.timestamp} 
        imageUrl={value.imageUrl} 
        postText={value.postText}
        profileImageUrl={value.profileImageUrl}
        />
      )        
    })
  }
    

  render() {
    return (
      <Container>        
        <Content>
          <StoriesTab />
            {this.renderPosts()}            
        </Content>
      </Container>
    );
  }
}


export default HomeScreen;