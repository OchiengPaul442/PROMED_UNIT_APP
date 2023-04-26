import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';

// components
import {
  FocusedStatusBar,
  RecButton,
  RegisterIcon,
  GuestIcon,
  SigninIcon,
} from '../../components';

// constants
import {COLORS, Logo, FONTS} from '../../constants';

const AccessScreen = ({navigation}) => {
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
            onPress={() => navigation.push('Login')}
            bgColor={COLORS.white}
            textColor={COLORS.primary}
            w={300}
            icon={<SigninIcon width={20} height={20} />}
          />
          <RecButton
            text="Register"
            onPress={() => navigation.push('Register')}
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
            onPress={() => navigation.navigate('App')}
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
