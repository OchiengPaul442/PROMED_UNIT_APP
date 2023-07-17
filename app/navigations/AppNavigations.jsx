import React from 'react';
import {StyleSheet, Text} from 'react-native';

// firebase imports
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// NetInfo
import NetInfo from '@react-native-community/netinfo';

// navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer'; // a module for the drawer navigation

// constants
import {COLORS} from '../constants';
import Styles from '../constants/Styles';

// components
import {Loader, ErrorHandle} from '../components';

// icons
import {
  Group,
  ProfileIcon,
  ChatIcon,
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
  PrivateChat,
  PrivateChatList,
  TherapistProfile,
  // Splash,
} from '../screens';

// context
import {AuthContext} from './Context/AuthContext';

// fetch functions
import {getUserData} from '../../fireStore';

// stacks
const AuthStack = createStackNavigator();
const BottomTabStack = createBottomTabNavigator();
const TherapyStack = createStackNavigator();
const GroupStack = createStackNavigator();
const DrawerStack = createDrawerNavigator();
const ProfileStack = createStackNavigator();
const ChatStack = createStackNavigator();
const HomeStack = createStackNavigator();

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
      name: 'Chat_root',
      label: 'Private Chats',
      component: ChatStackScreen,
      icon: ChatIcon,
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
      {drawers.map(
        drawer =>
          // use a short-circuit evaluation to skip the null item
          drawer && (
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
          ),
      )}
    </DrawerStack.Navigator>
  );
};

// Chat stack
const ChatStackScreen = () => {
  return (
    <ChatStack.Navigator
      initialRouteName="PrivateChatList"
      screenOptions={{
        headerShown: false,
      }}>
      <ChatStack.Screen name="PrivateChatList" component={PrivateChatList} />
      <ChatStack.Screen name="PrivateChats" component={PrivateChat} />
    </ChatStack.Navigator>
  );
};

const BottomTabs = () => {
  // use the useContext hook to get the user data value
  const {userData, anonymous} = React.useContext(AuthContext);

  //Define an array of tab icons with their names and components
  let tabs = [
    {name: 'Home', icon: Home, component: HomeStackScreen},
    {
      name: 'Therapy_root',
      icon: Therapist,
      component:
        userData && userData.userType !== 'Therapist'
          ? TherapyStackScreen
          : TherapistProfile,
    },
    {name: 'Groups_root', icon: Group, component: GroupStackScreen},
  ];

  // Only add the Bot_root tab if anonymous is false
  if (!anonymous) {
    tabs.push({name: 'Bot_root', icon: Boticon, component: Bot});
  }

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
            tabBarIconStyle: {
              width: 30,
              height: 30,
              position: 'relative',
            },
            tabBarIcon: ({focused}) => (
              <tab.icon fill={focused ? COLORS.secondary : COLORS.white} />
            ),
          }}
        />
      ))}
    </BottomTabStack.Navigator>
  );
};

// Home stack
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="TestResults" component={TestResult} />
      <HomeStack.Screen name="Terms" component={Terms} />
      <HomeStack.Screen name="Test" component={Test} />
    </HomeStack.Navigator>
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
      <TherapyStack.Screen name="Therapist" component={TherapistScreen} />
      <TherapyStack.Screen name="Confirmation" component={ConfirmationScreen} />
      <TherapyStack.Screen name="PrivateChats" component={PrivateChat} />
      <TherapyStack.Screen
        name="PrivateChatsList"
        component={PrivateChatList}
      />
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
        // set user token to null
        setUserToken(null);
        // set user data to null
        setUserData(null);
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
  const [takeTest, setTakeTest] = React.useState(false);
  const [notificationCount, setNotificationCount] = React.useState(0);

  // get current user and user doc reference
  const user = auth().currentUser;

  React.useEffect(() => {
    if (user) {
      getUserData(setUserData, setError, user);
    }

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setErrorStatus(true);
        setError('No internet connection');
      } else {
        setErrorStatus(false);
        setError('');
      }
    });

    return () => unsubscribe();
  }, [userToken, user]);

  React.useEffect(() => {
    // if user is signed in
    if (user) {
      const notificationRef = firestore()
        .collection('Users')
        .doc(user.uid)
        .collection('Notifications');
      notificationRef.onSnapshot(querySnapshot => {
        let count = 0;
        if (querySnapshot) {
          querySnapshot.forEach(documentSnapshot => {
            if (!documentSnapshot.data().read) {
              count++;
            }
          });
        }
        setNotificationCount(count);
      });
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        takeTest,
        setTakeTest,
        notificationCount,
        setNotificationCount,
        user,
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
      {user && user.uid ? <DrawerStackScreen /> : <AuthNavigation />}
      {/* <DrawerStackScreen /> */}

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
    height: 50,
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
