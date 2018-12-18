import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Left, Thumbnail,Button } from 'native-base';

class HeaderRow extends Component {

    render() {
    return (
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: 'https://facebook.github.io/react-native/img/showcase/facebook.png'}} />
                        <View style={[styles.container]}>
                            <View style={[styles.lat]}>
                                <Text style={{textAlignVertical: "center",textAlign: "center",}}>2030 {"\n"} Followers</Text>
                                <Text style={{textAlignVertical: "center",textAlign: "center",}}>2030 {"\n"} Posts</Text>
                                <Text style={{textAlignVertical: "center",textAlign: "center",}}>2030 {"\n"} Follwering</Text>
                            </View>
                            <View style={[styles.buttons]}>
                                <Button>
                                    <Text>Promote</Text>
                                </Button>
                                <Button>
                                    <Text>Hello</Text>
                                </Button>
                            </View>
                        </View>
                </Left>
            </CardItem>
        </Card>
    );
  }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    lat:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    buttons:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.05)',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
    },
})

export default HeaderRow