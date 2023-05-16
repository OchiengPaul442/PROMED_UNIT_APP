// imports
import React, {useContext} from 'react';
import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';

// context
import {AuthContext} from '../../navigations/Context/AuthContext'; // a context for the authentication state

// firebase imports
import auth from '@react-native-firebase/auth'; // a module for the firebase authentication

// components
import {
  FocusedStatusBar,
  RecButton,
  RegisterIcon,
  GuestIcon,
  SigninIcon,
} from '../../components'; // components for the status bar, buttons and icons

// constants
import {COLORS, Logo} from '../../constants'; // predefined colors and logo for the app

const AccessScreen = ({navigation}) => {
  // use the useContext hook to get the user data value
  const {setLoading, setAnonymous, setUserToken, setUserData} =
    useContext(AuthContext);

  // handle anonymous login
  const HandleAnonymousLogin = () => {
    setLoading(true);
    // sign in anonymously
    auth()
      .signInAnonymously()
      .then(() => {
        // set loading to false
        setLoading(false);
        // set the user token to the anonymous user id
        setUserToken(auth().currentUser.uid);
        // set the user data to the anonymous user data
        setUserData('');
        // set anonymous to true
        setAnonymous(true);
      })
      .catch(error => {
        // set loading to false
        setLoading(false);
        // set anonymous to false
        setAnonymous(false);
        // set error
        setError('Something went wrong, please try again!');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor="black" />

      {/* Logo */}
      <View style={styles.Logo}>
        <Image style={{width: 160, marginBottom: 8}} source={Logo} />
        <Text style={styles.logoText}> PROMED </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonSection}>
        <Text
          style={{
            ...styles.buttonHead,
          }}>
          Please signin / Register to continue
        </Text>
        <View style={styles.buttons}>
          <RecButton
            text="Sign In"
            onPress={() => navigation.navigate('Login')}
            bgColor={COLORS.white}
            textColor={COLORS.primary}
            w={300}
            icon={<SigninIcon width={20} height={20} />}
          />
          <RecButton
            text="Register"
            onPress={() => navigation.navigate('Register')}
            bgColor={COLORS.white}
            textColor={COLORS.primary}
            w={300}
            icon={<RegisterIcon width={20} height={20} />}
          />
          <RecButton
            text="Continue as Guest"
            bgColor={COLORS.white}
            textColor={COLORS.primary}
            w={300}
            onPress={HandleAnonymousLogin}
            icon={<GuestIcon width={20} height={20} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// styles
const styles = StyleSheet.create({
  // main container
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: COLORS.primary,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  // logo section
  Logo: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
  },

  logoText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 20,
  },

  // buttons section
  buttonSection: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonHead: {
    fontSize: 24,
    width: 300,
    textAlign: 'center',
    fontWeight: 300,
    color: COLORS.white,
    marginBottom: 20,
  },
});

export default AccessScreen;
