import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

// screens
import {
  WelcomeScreen,
  AccessScreen,
  LoginScreen,
  RegistrationScreen,
  PasswordRecovery,
  ChangePassword,
  SuccessScreen,
} from '../screens';

// tab navigation
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
      lazy={true}
      animationEnabled={true}>
      <Stack.Screen name="Home_root" component={BottomTabs} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Access" component={AccessScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Success" component={SuccessScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
