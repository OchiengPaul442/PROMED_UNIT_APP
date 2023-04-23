import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

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
  TherapistScreen,
  ConfirmationScreen,
  Notifications,
  Groupchat,
  Profile,
  Splash,
} from '../screens';

// stacks
const AuthStack = createStackNavigator();
const BottomTabStack = createBottomTabNavigator();
const TherapyStack = createStackNavigator();
const GroupStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const ProfileStack = createStackNavigator();

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
    </AuthStack.Navigator>
  );
};

// Drawer stack
const DrawerStackScreen = () => {
  return (
    <DrawerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <DrawerStack.Screen name="Home_root" component={BottomTabs} />
      <DrawerStack.Screen name="Profile_root" component={ProfileStackScreen} />
      <DrawerStack.Screen name="Notification" component={Notifications} />
    </DrawerStack.Navigator>
  );
};

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
        name="Groups_root"
        component={GroupStackScreen}
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
        name="Bot_root"
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
      <TherapyStack.Screen name="Therapist" component={TherapistScreen} />
      <TherapyStack.Screen name="Confirmation" component={ConfirmationScreen} />
    </TherapyStack.Navigator>
  );
};

// Group stack screen
const GroupStackScreen = () => {
  return (
    <GroupStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <GroupStack.Screen name="Groups" component={Groups} />
      <GroupStack.Screen name="Groupchat" component={Groupchat} />
    </GroupStack.Navigator>
  );
};

// Profile stack screen
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

// Root Navigation stack
const AppNavigations = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {userToken ? <DrawerStackScreen /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigations;

const styles = StyleSheet.create({
  menuBar: {
    position: 'absolute',
    width: 'auto',
    height: 55,
    left: 5,
    right: 5,
    bottom: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.5,
        shadowRadius: 10,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
