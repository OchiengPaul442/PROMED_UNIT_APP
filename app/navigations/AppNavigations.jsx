import React, {createContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// firebase imports
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

// navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

// constants
import {COLORS} from '../constants';
import Styles from '../constants/Styles';

// icons
import {
  Group,
  ProfileIcon,
  Bell,
  Home,
  Therapist,
  Boticon,
  LogoutIcon,
} from '../components';

// screens
import {
  WelcomeScreen,
  AccessScreen,
  LoginScreen,
  RegistrationScreen,
  PasswordRecovery,
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

// context
import {AuthContext} from './Context/AuthContext';

// stacks
const AuthStack = createStackNavigator();
const BottomTabStack = createBottomTabNavigator();
const TherapyStack = createStackNavigator();
const GroupStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const ProfileStack = createStackNavigator();

// Handle logout
const HandleLogout = () => {
  const {setUserToken, setUserData} = React.useContext(AuthContext);

  React.useEffect(() => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setUserToken(null);
        setUserData(null);

        // display access screen
        return <AccessScreen />;
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return null;
};

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
      <AuthStack.Screen name="Success" component={SuccessScreen} />
      <AuthStack.Screen name="Register" component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
};

// Drawer stack
const DrawerStackScreen = () => {
  //Define an array of drawer items with their names, components and icons
  const drawers = [
    {name: 'HomeScreen', label: 'Home', component: BottomTabs, icon: Home},
    {
      name: 'Profile_root',
      label: 'Profile',
      component: ProfileStackScreen,
      icon: ProfileIcon,
    },
    {
      name: 'Notification',
      label: 'Notification',
      component: Notifications,
      icon: Bell,
    },
    {
      name: 'Logout',
      label: 'Logout',
      component: HandleLogout,
      icon: LogoutIcon,
    },
  ];

  return (
    <DrawerStack.Navigator>
      {drawers.map(drawer => (
        <DrawerStack.Screen
          key={drawer.name}
          options={{
            headerShown: false,
            drawerLabel: () => (
              <Text style={Styles.title2}>{drawer.label}</Text>
            ),
            drawerIcon: () => (
              <drawer.icon fill={COLORS.black} width="20px" height="20px" />
            ),
          }}
          name={drawer.name}
          component={drawer.component}
        />
      ))}
    </DrawerStack.Navigator>
  );
};

//Bottom nav stack
const BottomTabs = () => {
  //Define an array of tab icons with their names and components
  const tabs = [
    {name: 'Home', icon: Home, component: HomeScreen},
    {name: 'Therapy_root', icon: Therapist, component: TherapyStackScreen},
    {name: 'Groups_root', icon: Group, component: GroupStackScreen},
    {name: 'Bot_root', icon: Boticon, component: Bot},
  ];

  return (
    <BottomTabStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.menuBar,
      }}>
      {tabs.map(tab => (
        <BottomTabStack.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({focused}) => (
              <tab.icon
                fill={focused ? COLORS.secondary : COLORS.white}
                width="30px"
                height="30px"
              />
            ),
          }}
        />
      ))}
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
      initialRouteName="Groups"
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
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen name="Profile" component={Profile} />
    </ProfileStack.Navigator>
  );
};

// Root Navigation stack
const AppNavigations = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(''); // initialize userToken as null
  const [userData, setUserData] = React.useState(''); // initialize userData as an empty object

  // React.useEffect(() => {
  //   // create a listener for authentication state changes
  //   const unsubscribe = auth().onAuthStateChanged(user => {
  //     // set userToken to the user object or null
  //     setUserToken(user);
  //     // set isLoading to false after getting the user token
  //     setIsLoading(false);
  //   });

  //   // return a cleanup function to unsubscribe from the listener
  //   return unsubscribe;
  // }, []);

  // if (isLoading) {
  //   return <Splash />;
  // }

  // get user data from the database for the logged in user
  // const getUserData = async () => {
  //   try {
  //     const user = await firestore()
  //       .collection('users')
  //       .doc(userToken.uid)
  //       .get();
  //     if (user.exists) {
  //       // set the user object in the context to the user data from the database
  //       setUser(user.data());
  //     } else {
  //       console.log('User does not exist!');
  //     }
  //   } catch (error) {
  //     console.log('Something went wrong with getUserData: ', error);
  //   }
  // };

  console.log('userToken ------>', userToken);
  console.log('userData ------>', userData);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
      }}>
      <NavigationContainer>
        {userToken ? <DrawerStackScreen /> : <AuthNavigation />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default AppNavigations;

const styles = StyleSheet.create({
  menuBar: {
    position: 'absolute',
    bottom: 3,
    marginHorizontal: 3,
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
