import React, { Alert, Component } from "react";
import { View,Text,Button,Icon, Container,Content } from 'native-base'

import CustomCard from '../customCard'
import StoriesTab from "../StoriesTab";
import Fire from "../../src/Fire";



/*
* TODO: 
* Be a to like a post
*/

export default class HomeScreen extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      statusArray: [],
    }

  }

  componentDidMount(){
    this.fetchFromDB()
    this.props.navigation.setParams({ logout: this._logout });
  }

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;

    return{
      headerTitle: 'Instagram',
      headerLeft: (
        <Button transparent onPress={() => params.logout()}>
          <Icon name='md-log-out' style={{paddingTop:10, paddingLeft:10, color:'black'}} />
        </Button>
      ),
      headerRight: (
        <Button transparent>
          <Icon name='md-paper-plane' style={{paddingRight:15, color:'black'}}/>
        </Button>
      ),
    };  
  }


  /**
   * Function for signing out the current user from the app and firebase
   */
  _logout = () => {
    Fire.shared.signOut()
  }
  
  /**
   * Function for fetching posts from firebase
   */
  fetchFromDB = async () =>{
    let responseArray = await Fire.shared.fetchFromDB()

    this.setState({
      //Reverse so newst post is on top
      statusArray: responseArray.reverse()
    })
  }

  shouldComponentUpdate(){
    console.log("Should update");
    return true
  }

  componentDidUpdate(){
    console.log("Component did update");
  
  }


  /*
  * Method for rendering each fetched post
  */
  renderPosts = () => {
    console.log(this.state.statusArray);
    return this.state.statusArray.map((value,index) => {
      
      return(        
        <CustomCard 
        key={index}
        postObject={value}
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

