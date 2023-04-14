import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

// components
import {RecButton} from '../../components';

// constants
import {COLORS} from '../../constants';

// layout
import AuthScreen from '../../layout/AuthScreen';

const PasswordRecovery = ({navigation}) => {
  // form values
  const [email, setEmail] = React.useState('');

  return (
    <AuthScreen form_title="PASSWORD RECOVERY">
      <View style={styles.form}>
        {/* Form Text */}
        <Text style={styles.formText}>
          Enter your email address below and we will send you a link to reset
          your password
        </Text>

        {/* form items */}
        <View style={styles.group}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </View>

        {/* Buttons */}
        <View style={styles.recButton}>
          <RecButton
            text="Submit Request"
            bgColor={COLORS.secondary}
            textColor={COLORS.primary}
            onPress={() => navigation.navigate('ChangePassword')}
            w="100%"
          />
          <View style={styles.separatorWrapper}>
            <View style={styles.separator}></View>
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.separator}></View>
          </View>
          <RecButton
            text="Sign Up"
            bgColor={COLORS.primary}
            textColor={COLORS.white}
            onPress={() => navigation.navigate('Register')}
            w="100%"
          />
        </View>
      </View>
    </AuthScreen>
  );
};

// styles
const styles = StyleSheet.create({
  // form text
  formText: {
    fontSize: 18,
    color: COLORS.darkGray,
    textAlign: 'left',
    marginBottom: 50,
  },

  // Styles for the form section within the main container
  form: {
    width: '100%',
    height: '100%',
    position: 'relative',
    paddingBottom: 10,
    paddingTop: 12,
  },
  // Styles for a group of related form elements
  group: {
    width: '100%',
    height: 50,
    position: 'relative',
    marginBottom: 50,
  },

  // Styles for a form input field
  input: {
    width: '100%',
    height: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary,
    fontSize: 18,
    color: COLORS.primary,
    padding: 10,
    marginTop: 10,
  },

  // Styles for a label associated with a form input field
  label: {
    position: 'absolute',
    left: 0,
    top: -10,
    fontSize: 18,
    color: COLORS.primary,
    paddingHorizontal: 5,
  },

  // Styles for a button or link to recover a forgotten password
  recButton: {
    width: '100%',
    height: 200,
    alignItems: 'center',
  },

  // Styles for a separator element used to visually divide sections of the form
  separatorWrapper: {
    width: '100%',
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Styles for the separator line within the separator element
  separator: {
    width: '30%',
    height: 1,
    backgroundColor: COLORS.primary,
  },

  // Styles for text within the separator element
  separatorText: {
    color: COLORS.primary,
    fontSize: 18,
    paddingHorizontal: 10,
  },
});

export default PasswordRecovery;
