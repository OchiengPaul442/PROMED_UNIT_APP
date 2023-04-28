import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../navigations/Context/AuthContext';

// firebase imports
import firebase from '@react-native-firebase/app';

// yup and formik imports
import {object, string} from 'yup';
import {Formik} from 'formik';

// components
import {
  RecButton,
  Checkbox,
  ViewIconeye,
  CloseIconeye,
  Loader,
} from '../../components';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

//layout
import AuthScreen from '../../layout/AuthScreen';

// @@@@@@@@@@@@@@@@@@@ FORM VALIDATION SCHEMA @@@@@@@@@@@@@@@@@@@ //

// form validation schema
let LoginValidationSchema = object({
  email: string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  password: string()
    .min(6, ({min}) => `Password must be at least ${min} characters!`)
    .required('Password is required!'),
});

const LoginScreen = ({navigation}) => {
  // use the useContext hook to get the user data value
  const {setUserToken, setUserData} = useContext(AuthContext);

  // inputs
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setAgree] = React.useState(false);

  // show password
  const [showPassword, setShowPassword] = React.useState(true);

  // catch errors
  const [errorDisplay, setErrorDisplay] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  // loading state
  const [loading, setLoading] = React.useState(false);

  const toggleCheckbox = () => {
    setAgree(!remember);
  };

  // handle login capture userToken
  const handleLogin = (email, password) => {
    // set loading to true before signing in
    setLoading(true);

    try {
      // Sign in user with email and password using Firebase auth
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          // Get the user token with getIdToken method
          return firebase.auth().currentUser.getIdToken();
        })
        .then(token => {
          // Set the user token in the global state
          setUserToken(token);
        })
        .then(() => {
          // Navigate to the next screen or show a success message
          setLoading(false);
        })
        .catch(error => {
          // set loading to false if there is an error
          setLoading(false);
          switch (error.code) {
            case 'auth/invalid-email':
              setErrorDisplay(true);
              setErrorMessage('Invalid email address!');
              break;
            case 'auth/user-disabled':
              setErrorDisplay(true);
              setErrorMessage('User account disabled!');
              break;
            case 'auth/user-not-found':
              setErrorDisplay(true);
              setErrorMessage('User not found!');
              break;
            case 'auth/network-request-failed':
              setErrorDisplay(true);
              setErrorMessage('Network error!');
              break;
            case 'auth/wrong-password':
              setErrorDisplay(true);
              setErrorMessage('Invalid password!');
              break;
            default:
              alert('Something went wrong! please try again' + error);
              break;
          }
        });
    } catch (error) {
      // set loading to false if there is an error
      setLoading(false);

      switch (error.code) {
        default:
          setErrorDisplay(true);
          setErrorMessage('Something went wrong please try again!' + error);
          console.log(error);
          break;
      }
    }
  };

  // timeout the message
  React.useEffect(() => {
    if (errorDisplay) {
      setTimeout(() => {
        setErrorDisplay(false);
        setErrorMessage('');
      }, 5000);
    }
  }, [errorDisplay]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validateOnMount={true}
      validationSchema={LoginValidationSchema}
      onSubmit={values => {
        handleLogin(values.email, values.password);
        setEmail(values.email);
        setPassword(values.password);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <AuthScreen form_title="SIGN IN FORM">
          <KeyboardAvoidingView behavior="padding">
            <View style={Styles.form}>
              {/* error display */}
              <Text
                style={{
                  display: errorDisplay ? 'flex' : 'none',
                  paddingLeft: 10,
                  ...Styles.error,
                }}>
                {errorMessage}
              </Text>

              <View style={Styles.group}>
                <Text style={Styles.label}>Email Address</Text>
                <TextInput
                  style={Styles.input}
                  placeholder=""
                  onBlur={handleBlur('email')}
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                {errors.email && touched.email && (
                  <Text style={Styles.error}>{errors.email}</Text>
                )}
              </View>

              <View style={Styles.group}>
                <Text style={Styles.label}>Password</Text>
                <TextInput
                  style={Styles.input}
                  placeholder=""
                  onBlur={handleBlur('password')}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  secureTextEntry={showPassword}
                />
                <TouchableOpacity
                  style={Styles.icon}
                  onPress={() => setShowPassword(!showPassword)}>
                  {!showPassword ? (
                    <ViewIconeye width={24} height={24} fill={COLORS.primary} />
                  ) : (
                    <CloseIconeye
                      width={24}
                      height={24}
                      fill={COLORS.primary}
                    />
                  )}
                </TouchableOpacity>
                {errors.password && touched.password && (
                  <Text style={Styles.error}>{errors.password}</Text>
                )}
              </View>

              {/* Remember me and forgot password */}
              <View style={styles.wrapper}>
                <Checkbox
                  text="Remember me"
                  setAgree={toggleCheckbox}
                  agree={remember}
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
                  onPress={handleSubmit}
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

          {/* Loader */}
          <Loader loading={loading} />
        </AuthScreen>
      )}
    </Formik>
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
