import React from 'react';
import { createStackNavigator, createAppContainer,createBottomTabNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './HomeScreen'
import LikeScreen from './LikeScreen'
import ProfileScreen from './ProfileScreen'


const LikeStack = createStackNavigator({
  Like: {screen: LikeScreen},
});

const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
});

const ProfileStack = createStackNavigator({
  Profile: {screen: ProfileScreen},
});

const RootStack = createBottomTabNavigator(
  {
  Home: {screen: HomeStack},
  Like: {screen: LikeStack},
  Profile: {screen: ProfileStack}
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
        } else if (routeName === 'Profile'){
          iconName = 'md-home'
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    })}
);

export default createAppContainer(RootStack);