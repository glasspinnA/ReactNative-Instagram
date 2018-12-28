import React, { PureComponent } from 'react';
import {  View, Text, StyleSheet, Image,Dimensions  } from 'react-native';
import { Container, Content, Thumbnail, Button,Icon} from 'native-base';
import Fire from './../../src/Fire'



class ProfileScreen extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            activeIndex: 0,
            imageArray: [],
            username:'',
        }

    }


  
    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
          title: 'username',
        };
      };
      

    async componentDidMount() {
        let userArray = await Fire.shared.getUser()
        

        this.fetchUserPosts(userArray[0].uid)
    }

    fetchUserPosts = async (uid) => {
        let responseArray = await Fire.shared.fetchUserPostsFromFirebase(uid)
        
        this.setState({
            imageArray: responseArray
        })
    }
    
    segmentClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    renderPageOne = () => {
        const deviceWidth = Dimensions.get('window').width

        return this.state.imageArray.map((value, index) => {
            return(
                <View key={index} style={[ {width: deviceWidth / 3}, {height: deviceWidth / 3} ]}>
                    <Image style={{ flex: 1, width:undefined, height: undefined}} source={{uri:value.imageUrl}}/>
                </View>
            )
        })
    }

    renderSection = () =>{ 
        switch(this.state.activeIndex){
            case 0:
                return (
                    <View style={{flexDirection: 'row', flexWrap:'wrap'}}>
                        {this.renderPageOne()}
                    </View>
                )
            case 1:
                return (
                    <View>
                        <Text>Second section</Text>
                    </View>
                )
        }
    }

  render() {
    return (
    <Container>
        <Content>
            <View>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1, marginVertical:10, marginHorizontal:10}}>
                        <Thumbnail source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} />
                    </View>
                    <View style={{flex: 3, marginVertical:10, marginHorizontal:10}}>
                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <View style={{alignItems:'center'}}>
                                <Text>1</Text>
                                <Text>Posts</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text>3</Text>
                                <Text>Followers</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text>1</Text>
                                <Text>Following</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row',}}>
                            <Button bordered dark style={{flex:2, justifyContent:'center', height:35, margin:5}}>
                                <Text>Edit</Text>
                            </Button>
                            <Button bordered dark style={{flex:1, justifyContent:'center', height:35, margin:5}}>
                                <Text>Settings</Text>
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={{paddingVertical:5, paddingHorizontal: 20}}>
                    <Text>Test</Text>
                    <Text>Test</Text>
                    <Text>Test</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent: 'space-around', borderTopWidth:2, borderTopColor:'blue'}}>
                    <Button transparent onPress={()=>this.segmentClicked(0)} active={this.state.activeIndex == 0}>
                        <Icon name="home" style={[this.state.activeIndex == 0 ? {} : {color:'gray'}]}/>
                    </Button>
                    <Button transparent onPress={()=>this.segmentClicked(1)} active={this.state.activeIndex == 1}>
                        <Icon name="keypad"style={[this.state.activeIndex == 1 ? {} : {color:'gray'}]}/>
                    </Button>
                    <Button transparent onPress={()=>this.segmentClicked(2)} active={this.state.activeIndex == 2}>
                        <Icon name="bookmark"style={[this.state.activeIndex == 2 ? {} : {color:'gray'}]}/>
                    </Button>
                    <Button transparent onPress={()=>this.segmentClicked(3)} active={this.state.activeIndex == 3}>
                        <Icon name="bookmark"style={[this.state.activeIndex == 3 ? {} : {color:'gray'}]}/>
                    </Button>
                </View>
                
                {this.renderSection()}

            </View>
        </Content>
    </Container>
    );
  }
}


const style = StyleSheet.create({
    button:{
        height:30,
        marginRight: 10,
        justifyContent: 'center',
        marginLeft: 10,
    }
})

export default ProfileScreen
