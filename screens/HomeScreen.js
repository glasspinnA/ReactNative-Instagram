import React, { Alert, Component } from "react";
import { View,Text,Button,Icon, Container,Content } from 'native-base'

import CustomCard from './CustomCard';
import StoriesTab from "./StoriesTab";
import fire from "../src/fire";

class HomeScreen extends React.Component {
  
  constructor(props){
    super(props)

    this.state = {
      statusArray: [],
    }

  }

  componentDidMount(){
    this.fetchPostsFromDB()
  }

  static navigationOptions = () => {
    return{
      headerTitle: 'Instagram',
      headerLeft: (
        <Button transparent>
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

  /*
  * Method for fetching status posts from database
  */
  fetchPostsFromDB = () =>{
    let ref = fire.database().ref('posts')
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