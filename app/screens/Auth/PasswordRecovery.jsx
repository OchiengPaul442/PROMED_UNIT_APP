import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import React from 'react';

// components
import {RecButton} from '../../components';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

// layout
import AuthScreen from '../../layout/AuthScreen';

const PasswordRecovery = ({navigation}) => {
  // form values
  const [email, setEmail] = React.useState('');

  return (
    <AuthScreen form_title="PASSWORD RECOVERY">
      <KeyboardAvoidingView behavior="padding">
        <View style={Styles.form}>
          {/* Form Text */}
          <Text style={Styles.formText}>
            Enter your email address below and we will send you a link to reset
            your password
          </Text>

          {/* form items */}
          <View style={Styles.group}>
            <Text style={Styles.label}>Email</Text>
            <TextInput
              style={Styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>

          {/* Buttons */}
          <View style={Styles.recButton}>
            <RecButton
              text="Submit Request"
              bgColor={COLORS.secondary}
              textColor={COLORS.primary}
              onPress={() => navigation.push('ChangePassword')}
              w="100%"
            />
            <View style={Styles.separatorWrapper}>
              <View style={Styles.separator}></View>
              <Text style={Styles.separatorText}>OR</Text>
              <View style={Styles.separator}></View>
            </View>
            <RecButton
              text="Sign Up"
              bgColor={COLORS.primary}
              textColor={COLORS.white}
              onPress={() => navigation.push('Register')}
              w="100%"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </AuthScreen>
  );
};

export default PasswordRecovery;
