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
import {RecButton, Checkbox, ViewIconeye, CloseIconeye} from '../../components';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

//layout
import AuthScreen from '../../layout/AuthScreen';

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
  const {setUserToken, setLoading, setError} = useContext(AuthContext);

  // inputs
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [remember, setAgree] = React.useState(false);

  // show password
  const [showPassword, setShowPassword] = React.useState(true);

  // toggle checkbox
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
          // get the user token
          return firebase.auth().currentUser.getIdToken(true);
        })
        .then(token => {
          // Set the user token in the global state
          setUserToken(token);
        })
        .then(() => {
          // set loading to false if there is no error
          setLoading(false);
        })
        .catch(error => {
          // set loading to false if there is an error
          setLoading(false);
          switch (error.code) {
            case 'auth/invalid-email':
              setError('Invalid email!');
              break;
            case 'auth/user-disabled':
              setError('User disabled!');
              break;
            case 'auth/user-not-found':
              setError('User not found!');
              break;
            case 'auth/network-request-failed':
              setError('Connection error!');
              break;
            case 'auth/wrong-password':
              setError('Wrong password!');
              break;
            default:
              setError('Something went wrong please try again!');
              break;
          }
        });
    } catch (error) {
      // set loading to false if there is an error
      setLoading(false);

      switch (error.code) {
        default:
          setError('Something went wrong please try again!');
          break;
      }
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validateOnMount={true}
      validationSchema={LoginValidationSchema}
      onSubmit={(values, {resetForm}) => {
        handleLogin(values.email, values.password);
        setEmail(values.email);
        setPassword(values.password);
        // reset the form after submission
        resetForm({values: ''});
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <AuthScreen form_title="SIGN IN FORM">
          <KeyboardAvoidingView behavior="padding">
            <View style={Styles.form}>
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
                  onPress={() => navigation.navigate('Register')}
                  w="100%"
                />
              </View>
            </View>
          </KeyboardAvoidingView>
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
