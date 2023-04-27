import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import React from 'react';

// components
import {RecButton} from '../../components';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

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
      <KeyboardAvoidingView behavior="padding">
        <View style={Styles.form}>
          {/* Form text */}
          <Text style={Styles.formText}>Enter your new password below</Text>

          {/* form items */}
          {formItems.map(item => (
            <View key={item.id} style={Styles.group}>
              <Text style={Styles.label}>{item.label}</Text>
              <TextInput
                style={Styles.input}
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
          <View style={Styles.recButton}>
            <RecButton
              onPress={() => navigation.push('Success')}
              text="Change Password"
              bgColor={COLORS.secondary}
              textColor={COLORS.primary}
              w="100%"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AuthScreen>
  );
};

export default ChangePassword;
