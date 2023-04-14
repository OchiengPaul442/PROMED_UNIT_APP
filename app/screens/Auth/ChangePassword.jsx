import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

// components
import {RecButton} from '../../components';

// constants
import {COLORS} from '../../constants';

// layout
import AuthScreen from '../../layout/AuthScreen';

const ChangePassword = ({navigation}) => {
  // form items
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  // list of items in the form with their labels and placeholders for the input fields respectively using maps and their own keys
  const formItems = [
    {
      id: 1,
      value: password,
      label: 'New Password',
      placeholder: '',
    },
    {
      id: 2,
      value: confirmPassword,
      label: 'Confirm Password',
      placeholder: '',
    },
  ];

  return (
    <AuthScreen form_title="PASSWORD CHANGE">
      <View style={styles.form}>
        {/* Form text */}
        <Text style={styles.formText}>Enter your new password below</Text>

        {/* form items */}
        {formItems.map(item => (
          <View key={item.id} style={styles.group}>
            <Text style={styles.label}>{item.label}</Text>
            <TextInput
              style={styles.input}
              placeholder={item.placeholder}
              value={item.value}
              onChangeText={text => {
                if (item.id === 1) {
                  setPassword(text);
                } else if (item.id === 2) {
                  setConfirmPassword(text);
                }
              }}
              secureTextEntry={true}
            />
          </View>
        ))}

        {/* Buttons */}
        <View style={styles.recButton}>
          <RecButton
            onPress={() => navigation.navigate('Success')}
            text="Change Password"
            bgColor={COLORS.secondary}
            textColor={COLORS.primary}
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // There is no current separator for this section
});

export default ChangePassword;
