import React from 'react';
import { createStackNavigator, createAppContainer,createBottomTabNavigator, createSwitchNavigator} from 'react-navigation';

import Container from './screens/Container'
import LoadingScreen from './screens/LoadingScreen'
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'

const LoadingStack = createStackNavigator({ Load:LoadingScreen });
//const HomeStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const ContainerStack = createStackNavigator({ Home: Container});
const SignUpStack = createStackNavigator({ SignUp: SignUpScreen, Login: LoginScreen });
const LogInStack = createStackNavigator({ Login: LoginScreen  });


export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: LoadingStack,
    Home: ContainerStack,
    SignUp: SignUpStack,
    Login: LogInStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
