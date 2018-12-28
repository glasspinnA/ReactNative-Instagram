import React, { PureComponent } from 'react';
import {  View, Text, StyleSheet, Image,Dimensions  } from 'react-native';
import { Container, Content, Thumbnail, Button,Icon} from 'native-base';
import Fire from '../../src/Fire'



class ProfileScreen extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            activeIndex: 0,
            imageArray: [],
            userArray:{},
        }

    }

    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        return {
          title: 'Profile',
        };
      };
      

    async componentDidMount() {
        let userArray = await Fire.shared.getUser()

        this.setState({userArray: userArray[0]})

        this.fetchUserPosts(userArray[0].uid)
    }

    /**
     * Middelware function for fetching only the current logged in users posts
     */
    fetchUserPosts = async (uid) => {
        let responseArray = await Fire.shared.fetchUserPostsFromFirebase(uid)

        this.setState({
            imageArray: responseArray
        })
    }
    
    /**
     * Function for handeling which section in the section bar is clicked
     */
    sectionClicked = (index) => {
        this.setState({
            activeIndex: index
        })
    }

    /**
     * Function which renders the photo feed section
     */
    renderPhotoFeed = () => {
        return this.state.imageArray.map((value, index) => {
            return(
                <View key={index} style={[styles.imageFeed, index % 3 !== 0 ? {paddingLeft:2} : {paddingLeft: 0}]}>
                    <Image style={{ flex: 1, width:undefined, height: undefined}} source={{uri:value.imageUrl}}/>
                </View>
            )
        })
    }


    edittPage = () =>{
        this.props.navigation.navigate('Edit', {uid: this.state.userArray.uid})
    }

    /**
     * Function which decides what will happen when different sections are clicked on
     */
    renderSection = () =>{ 
        switch(this.state.activeIndex){
            case 0:
                return (
                    <View style={{flexDirection: 'row', flexWrap:'wrap',}}>
                        {this.renderPhotoFeed()}
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
                        <Thumbnail large source={{uri: this.state.userArray.imageUrl}} style={styles.thumbnail} />
                    </View>

                    <View style={{flex: 3, marginVertical:10, marginHorizontal:10}}>

                        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                            <View style={{alignItems:'center'}}>
                                <Text>{this.state.imageArray.length}</Text>
                                <Text>Posts</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text>-</Text>
                                <Text>Followers</Text>
                            </View>
                            <View style={{alignItems:'center'}}>
                                <Text>-</Text>
                                <Text>Following</Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row',}}>
                            <Button 
                                bordered dark 
                                style={[styles.buttonStyleSmall, styles.buttonStyle]} 
                                onPress={this.edittPage} >

                                <Text>Edit</Text>
                            
                            </Button>
                            <Button bordered dark style={styles.buttonStyle}>
                                <Text>Settings</Text>
                            </Button>
                        </View>
                
                    </View>

                </View>

                <View style={{paddingVertical:5, paddingHorizontal: 20}}>
                    <Text style={{fontWeight:'bold'}}>{this.state.userArray.username}</Text>
                    <Text>{this.state.userArray.userInfo}</Text>
                </View>

                <View style={{flexDirection:'row', justifyContent: 'space-around', borderTopWidth:1, borderTopColor:'gray'}}>
                    <Button transparent onPress={()=>this.sectionClicked(0)} active={this.state.activeIndex == 0}>
                        <Icon name="home" style={[this.state.activeIndex == 0 ? {} : {color:'gray'}]}/>
                    </Button>
                    <Button transparent onPress={()=>this.sectionClicked(1)} active={this.state.activeIndex == 1}>
                        <Icon name="keypad"style={[this.state.activeIndex == 1 ? {} : {color:'gray'}]}/>
                    </Button>
                    <Button transparent onPress={()=>this.sectionClicked(2)} active={this.state.activeIndex == 2}>
                        <Icon name="bookmark"style={[this.state.activeIndex == 2 ? {} : {color:'gray'}]}/>
                    </Button>
                    <Button transparent onPress={()=>this.sectionClicked(3)} active={this.state.activeIndex == 3}>
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

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    
    button:{
        height:30,
        marginRight: 10,
        justifyContent: 'center',
        marginLeft: 10,
    },
    thumbnail:{
        borderColor:'gray',
        borderWidth:1,
    },
    buttonStyle:{
        flex:2, 
        justifyContent:'center', 
        height:35, 
        margin:5
    },
    buttonStyleSmall:{
        flex:1,
    },
    imageFeed:{
        marginBottom:2,
        width: deviceWidth / 3,
        height: deviceWidth / 3,
    }
})

export default ProfileScreen
