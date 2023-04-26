import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

// components
import {FocusedStatusBar, BackBtn} from '../components';

// constants
import {COLORS} from '../constants';

// navigation
import {useNavigation} from '@react-navigation/native';

const AuthScreen = props => {
  //navigation
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* StatusBar */}
      <FocusedStatusBar backgroundColor="black" />

      {/* form head */}
      <View style={styles.formHead}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.formbackButton}>
          <BackBtn width={30} height={30} fill={COLORS.secondary} />
        </TouchableOpacity>
        <Text style={styles.formHeadText}>{props.form_title}</Text>
      </View>

      {/* form body */}
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {props.children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  // Container styles for the entire form interface
  container: {
    backgroundColor: COLORS.primary,
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
  },

  // Styles for the header section of the form
  formHead: {
    position: 'relative',
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Styles for the text in the header
  formHeadText: {
    top: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white,
    position: 'relative',
    fontWeight: 'bold',
    height: '30%',
  },

  // Styles for a button to go back, positioned in the top-left corner of the header
  formbackButton: {
    position: 'absolute',
    left: 0,
    top: 10,
    padding: 10,
  },

  // Styles for the main container of the form
  formContainer: {
    width: '100%',
    height: '70%',
    overflow: 'scroll',
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'relative',
    paddingTop: 30,
  },
});
