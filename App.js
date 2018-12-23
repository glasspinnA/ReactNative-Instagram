import React from 'react';
import { createStackNavigator, createAppContainer,createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/AuthStack/LoginScreen'
import RegisterScreen from './screens/AuthStack/RegisterScreen'
import HomeScreen from './screens/FeedScreens/HomeScreen'
import LikeScreen from './screens/FeedScreens/LikeScreen'
import ProfileScreen from './screens/FeedScreens/ProfileScreen'

const AuthProcessStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

const LikeStack = createStackNavigator({
  Like: {screen: LikeScreen},
});

const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
});

const ProfileStack = createStackNavigator({
  Profile: {screen: ProfileScreen},
});

const TabStack = createBottomTabNavigator(
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

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    AuthRoute: AuthProcessStack,
    HomeFeed: TabStack 
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
