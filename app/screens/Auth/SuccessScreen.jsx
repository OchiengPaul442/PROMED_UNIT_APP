import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';

// constants
import {COLORS} from '../../constants';

// components
import {
  FocusedStatusBar,
  RecButton,
  ConfirmedAnimation,
} from '../../components';

const SuccessScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor="black" />

      {/* form head */}
      <View style={styles.formHead}>
        <Text style={styles.formHeadText}>PASSWORD RESET EMAIL SENT</Text>
      </View>

      {/* confirmation tick */}
      <View style={styles.confirm}>
        <ConfirmedAnimation />
      </View>

      {/* Buttons */}
      <View style={styles.recButton}>
        <RecButton
          text="Continue to Login"
          bgColor={COLORS.secondary}
          textColor={COLORS.primary}
          onPress={() => navigation.navigate('Login')}
          w="100%"
        />
      </View>
    </SafeAreaView>
  );
};

// styles
const styles = StyleSheet.create({
  // Container styles for the entire form interface
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: COLORS.primary,
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  // Styles for the header section of the form
  formHead: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Styles for the text in the header
  formHeadText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white,
    position: 'relative',
    top: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Styles for the main container of the form
  formContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  // Styles for a button or link to recover a forgotten password
  recButton: {
    width: '100%',
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Styles for the confirmation tick
  confirm: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SuccessScreen;
