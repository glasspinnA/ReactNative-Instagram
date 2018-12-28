import React from 'react';
import { createStackNavigator, createAppContainer,createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/AuthStack/LoginScreen'
import RegisterScreen from './screens/AuthStack/RegisterScreen'
import HomeScreen from './screens/FeedScreens/HomeScreen'
import LikeScreen from './screens/FeedScreens/LikeScreen'
import ProfileScreen from './screens/FeedScreens/ProfileScreen'

import PostTabScreen from './screens/FeedScreens/PostTabScreen'
import CommentScreen from './screens/FeedScreens/CommentScreen'
import EditScreen from './screens/FeedScreens/EditScreen'

const AuthProcessStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

const LikeStack = createStackNavigator({
  Like: {screen: LikeScreen},
});

const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
  Comment: {screen: CommentScreen}
});

const ProfileStack = createStackNavigator({
  Profile: {screen: ProfileScreen},
  Edit: {screen: EditScreen},
});


const PostTabStack = createStackNavigator({
  PostTab: {screen: PostTabScreen},
});

const CommentStack = createStackNavigator({
  PostTab: {screen: PostTabScreen},
})

const TabStack = createBottomTabNavigator(
  {
  Home: {screen: HomeStack},
  //Like: {screen: LikeStack},
  PostTab:{screen: PostTabStack},
  Profile: {screen: ProfileStack},

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
        else if (routeName === 'PostTab'){
          iconName = 'md-camera'
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    })}
);

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    
    AuthRoute: AuthProcessStack,
    
    Tabs: TabStack,
    
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
