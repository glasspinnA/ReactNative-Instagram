import React, { Alert, Component } from "react";
import { View,Text,Button,Icon, Container,Content } from 'native-base'

import CustomCard from '../CustomCard';
import StoriesTab from "../StoriesTab";
import firebase from "../../src/fire";

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
    let ref = firebase.database().ref('posts')
    ref.once('value',snapshot =>{
      let statusItems = snapshot.val();
      let newStatusArray = [];

      for (let item in statusItems) {
        newStatusArray.push({
          id: item,
          title: statusItems[item].userId
        });
      } 

      this.setState({
        statusArray: newStatusArray
      })
    })
  }


  /*
  * Method for rendering each fetched post
  */
  renderPosts = () => {
    return this.state.statusArray.map((value,index) => {
      return(        
        <CustomCard key={index} username={value.id}/>
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