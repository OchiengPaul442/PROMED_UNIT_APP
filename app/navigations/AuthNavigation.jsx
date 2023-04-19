import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// constants
import {COLORS} from '../constants';

// icons
import {Group, Home, Therapist, Boticon} from '../components';

// screens
import {
  WelcomeScreen,
  AccessScreen,
  LoginScreen,
  RegistrationScreen,
  PasswordRecovery,
  ChangePassword,
  SuccessScreen,
  HomeScreen,
  Therapy,
  Groups,
  Bot,
  Terms,
  Test,
  TestResult,
} from '../screens';

const AuthStack = createStackNavigator();
// Auth stack
const AuthNavigation = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Access" component={AccessScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="PasswordRecovery" component={PasswordRecovery} />
      <AuthStack.Screen name="ChangePassword" component={ChangePassword} />
      <AuthStack.Screen name="Success" component={SuccessScreen} />
      <AuthStack.Screen name="Register" component={RegistrationScreen} />
      <AuthStack.Screen name="Home_root" component={BottomTabs} />
    </AuthStack.Navigator>
  );
};

// stacks
const BottomTabStack = createBottomTabNavigator();
const TherapyStack = createStackNavigator();

//Bottom nav stack
const BottomTabs = () => {
  return (
    <BottomTabStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.menuBar,
        tabBarHideOnKeyboard: true,
      }}>
      <BottomTabStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Home
              fill={focused ? COLORS.secondary : COLORS.white}
              width="30px"
              height="30px"
            />
          ),
        }}
      />
      <BottomTabStack.Screen
        name="Therapy_root"
        component={TherapyStackScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Therapist
              fill={focused ? COLORS.secondary : COLORS.white}
              width="30px"
              height="30px"
            />
          ),
        }}
      />
      <BottomTabStack.Screen
        name="Groups"
        component={Groups}
        options={{
          tabBarIcon: ({focused}) => (
            <Group
              fill={focused ? COLORS.secondary : COLORS.white}
              width="30px"
              height="30px"
            />
          ),
        }}
      />
      <BottomTabStack.Screen
        name="Bot"
        component={Bot}
        options={{
          tabBarIcon: ({focused}) => (
            <Boticon
              fill={focused ? COLORS.secondary : COLORS.white}
              width="30px"
              height="30px"
            />
          ),
        }}
      />
    </BottomTabStack.Navigator>
  );
};

// Therapy stack screen
const TherapyStackScreen = () => {
  return (
    <TherapyStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <TherapyStack.Screen name="Therapy" component={Therapy} />
      <TherapyStack.Screen name="Terms" component={Terms} />
      <TherapyStack.Screen name="Test" component={Test} />
      <TherapyStack.Screen name="TestResults" component={TestResult} />
    </TherapyStack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({
  menuBar: {
    height: 55,
    position: 'absolute',
    left: 5,
    right: 5,
    bottom: 5,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
});
