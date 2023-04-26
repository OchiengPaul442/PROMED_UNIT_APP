import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

// components
import {RecButton, Checkbox} from '../../components';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

//layout
import AuthScreen from '../../layout/AuthScreen';

const LoginScreen = ({navigation}) => {
  // handle password
  const [password, setPassword] = React.useState('');
  // handle username
  const [username, setUsername] = React.useState('');
  // Remember me
  const [agree, setAgree] = React.useState(false);

  const toggleCheckbox = () => {
    setAgree(!agree);
  };

  // list of items in the form with their labels and placeholders for the input fields respectively using maps and their own keys
  const formItems = [
    {
      id: 1,
      value: username,
      label: 'Username',
      placeholder: '',
    },
    {
      id: 2,
      value: password,
      label: 'Password',
      placeholder: '',
    },
  ];

  return (
    <AuthScreen form_title="SIGN IN FORM">
      <View style={Styles.form}>
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
                  setUsername(text);
                } else if (item.id === 2) {
                  setPassword(text);
                }
              }}
              secureTextEntry={item.id === 2 ? true : false}
            />
          </View>
        ))}

        {/* Remember me and forgot password */}
        <View style={styles.wrapper}>
          <Checkbox
            text="Remember me"
            setAgree={toggleCheckbox}
            agree={agree}
          />
          <View>
            <TouchableOpacity
              onPress={() => navigation.push('PasswordRecovery')}
              style={styles.fwdPassword}>
              <Text style={styles.fwdText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}
        <View style={Styles.recButton}>
          <RecButton
            text="Login"
            bgColor={COLORS.secondary}
            textColor={COLORS.primary}
            onPress={() => navigation.navigate('Register')}
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
    </AuthScreen>
  );
};

// styles
const styles = StyleSheet.create({
  // Styles for a wrapper element containing multiple form elements
  wrapper: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Styles for a forward button or link
  fwdPassword: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  // Styles for text within a forward button or link
  fwdText: {
    color: COLORS.primary,
    fontSize: 18,
  },
});

export default LoginScreen;
