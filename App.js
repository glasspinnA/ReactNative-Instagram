import React from 'react';
import { createStackNavigator, createAppContainer,createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen';
import LikeScreen from './screens/LikeScreen';


const LikeStack = createStackNavigator({
  Like: {screen: LikeScreen},
});

const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
});

const RootStack = createBottomTabNavigator(
  {
  Home: {screen: HomeStack},
  Like: {screen: LikeStack},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'md-home'
        } else if (routeName === 'Like') {
          iconName = `md-heart${focused ? '' : '-empty'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    })}
);

export default createAppContainer(RootStack);