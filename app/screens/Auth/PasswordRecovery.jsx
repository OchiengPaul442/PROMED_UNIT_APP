import {View, Text, TextInput, KeyboardAvoidingView} from 'react-native';
import React, {useContext} from 'react';
// context
import {AuthContext} from '../../navigations/Context/AuthContext';

// firebase imports
import firebase from '@react-native-firebase/app';

// yup and formik imports
import {object, string} from 'yup';
import {Formik} from 'formik';

// components
import {RecButton, Loader} from '../../components';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

// layout
import AuthScreen from '../../layout/AuthScreen';

// form validation schema
let passwordRecoveryValidationSchema = object({
  email: string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
});

const PasswordRecovery = ({navigation}) => {
  // use the useContext hook to get the user data value
  const {setError, setLoading} = useContext(AuthContext);

  // password recovery function
  const handleRecovery = email => {
    // set loading to true
    setLoading(true);

    // Send a password reset email to the user with sendPasswordResetEmail method
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        // Show a success message
        setLoading(false);
        // Navigate to the login screen after some time has passed
        setTimeout(() => {
          navigation.navigate('Success');
        }, 500);
      })
      .catch(error => {
        setLoading(false);
        // Show an error message
        switch (error.code) {
          case 'auth/invalid-email':
            setError('Please enter a valid email address.');
            break;
          case 'auth/network-request-failed':
            setError('Connection error. Please try again.');
            break;
          case 'auth/user-not-found':
            setError('User not found.');
            break;
          default:
            alert(error.message);
            break;
        }
      });
  };

  return (
    <Formik
      validationSchema={passwordRecoveryValidationSchema}
      initialValues={{email: ''}}
      onSubmit={values => {
        handleRecovery(values.email);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <AuthScreen form_title="PASSWORD RECOVERY">
          <KeyboardAvoidingView behavior="padding">
            <View style={Styles.form}>
              {/* Form Text */}
              <Text style={Styles.formText}>
                Enter your email address below and we will send you a link to
                reset your password
              </Text>

              {/* email input */}
              <View style={Styles.group}>
                <Text style={Styles.label}>Email</Text>
                <TextInput
                  style={Styles.input}
                  placeholder="example@gmail.com"
                  placeholderTextColor={COLORS.gray}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                {errors.email && touched.email && (
                  <Text style={Styles.error}>{errors.email}</Text>
                )}
              </View>

              {/* Buttons */}
              <View style={Styles.recButton}>
                <RecButton
                  text="Submit Request"
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

export default PasswordRecovery;
