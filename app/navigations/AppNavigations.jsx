import React from 'react';
import {StyleSheet, Text} from 'react-native';
// firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// NetInfo
import NetInfo from '@react-native-community/netinfo';

// navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';

// constants
import {COLORS} from '../constants';
import Styles from '../constants/Styles';
import {Loader, ErrorHandle} from '../components';

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
  Groupdetails,
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
const Stack = createStackNavigator();

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
  // use the useContext hook to get the user data value
  const {userData} = React.useContext(AuthContext);

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
      initialRouteName="Therapy"
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
      <GroupStack.Screen name="Groupdetails" component={Groupdetails} />
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

// Handle logout
const HandleLogout = () => {
  const {setUserToken, setUserData, setAnonymous} =
    React.useContext(AuthContext);

  React.useEffect(() => {
    // signout the user
    auth()
      .signOut()
      .then(() => {
        // remove the user token from async storage
        AsyncStorage.removeItem('userToken');
        // set the user token to null
        setUserToken('');
        // set the user data to null
        setUserData('');
        // set anonymous to false
        setAnonymous(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return null;
};

// Root Navigation stack
const AppNavigations = () => {
  const [loading, setLoading] = React.useState(false);
  const [errorStatus, setErrorStatus] = React.useState('');
  const [error, setError] = React.useState('');
  const [anonymous, setAnonymous] = React.useState(false);
  const [userToken, setUserToken] = React.useState('');
  const [userData, setUserData] = React.useState('');

  // if usertoken is set, get stream of user data for the current user from firestore
  React.useEffect(() => {
    if (userToken) {
      // get current user UID
      const uid = auth().currentUser.uid;

      // get user data from firestore
      firestore()
        .collection('Users')
        .doc(uid)
        .onSnapshot(documentSnapshot => {
          // if connection is established successfully set user data
          if (documentSnapshot.exists) {
            // set userData state
            setUserData(documentSnapshot.data());
          } else {
            // if connection is not established successfully
            setUserData('');
            // set error status to true
            setErrorStatus(true);
            // set error message
            setError('Error connecting to server');
          }
        });
    }

    // if app is not connected to internet
    NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        // set error status to true
        setErrorStatus(true);
        // set error message
        setError('No internet connection');
      } else {
        // set error status to false
        setErrorStatus(false);
        // set error message
        setError('');
      }
    });
  }, [userToken]);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        userData,
        setUserData,
        anonymous,
        setAnonymous,
        loading,
        setLoading,
        error,
        setError,
        errorStatus,
        setErrorStatus,
      }}>
      {/* Display */}
      {/* {userToken ? <DrawerStackScreen /> : <AuthNavigation />} */}
      <DrawerStackScreen />

      {/* Loader */}
      <Loader loading={loading} />
      {/* Error handler */}
      <ErrorHandle message={error} />
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
