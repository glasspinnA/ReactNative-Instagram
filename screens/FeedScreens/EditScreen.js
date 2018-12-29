import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Fire from '../../src/Fire'
import { Item, Input, Button, Body } from 'native-base';

export default class EditScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userInfo: '',
    };
  }

  componentDidMount = async () => {
    const uid = this.props.navigation.getParam('uid', 'NO-ID');

    let text = await Fire.shared.fetchUserInfo(uid)

    this.setState({userInfo: text})
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Edit Profile',
    };
  };

  /**
   * Middleware function for passing text about the user to the function which uploads the 
   * information on firebase
   */
  updateUserInfo = () =>{    
    const uid = this.props.navigation.getParam('uid', 'NO-ID');

    Fire.shared.updateUserInfo(uid,this.state.userInfo)
  }

  render() {
    return (
      <View style={{flexDirection:'row'}}>
        <Body>
          <Item rounded>
            <Input 
              placeholder="Edit your profile information" 
              onChangeText={(infoInput) => this.setState({userInfo: infoInput})}
              value={this.state.userInfo} />
          </Item>
        </Body>
        <Button info rounded onPress={this.updateUserInfo} style={{padding:20, margin:10}}>
            <Text>Edit</Text>
        </Button>
      </View>
    );
  }
}
