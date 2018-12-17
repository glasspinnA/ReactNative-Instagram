import React from 'react';
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const RootStack = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Login: {
    screen: LoginScreen
  }
});

const App = createAppContainer(RootStack);


export default App;