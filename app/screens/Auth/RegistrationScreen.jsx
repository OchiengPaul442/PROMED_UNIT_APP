import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../navigations/Context/AuthContext';

// firebase imports
import firestore from '@react-native-firebase/firestore';
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

// dropdown import
import DropDownPicker from 'react-native-dropdown-picker';

// constants
import {COLORS} from '../../constants';
import Styles from '../../constants/Styles';

//layout
import AuthScreen from '../../layout/AuthScreen';

// @@@@@@@@@@@@@@@@@@@ FORM VALIDATION SCHEMA @@@@@@@@@@@@@@@@@@@ //
// min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// phone number regex
const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

// form validation schema
let registrationValidationSchema = object({
  username: string().required(),
  email: string()
    .email('Please enter a valid email!')
    .required('Email is required!'),
  phone: string()
    .matches(phoneRegex, 'Phone number is not valid!')
    .required('Phone number is required!'),
  password: string()
    .min(6, ({min}) => `Password must be at least ${min} characters!`)
    .required('Password is required!')
    .matches(
      passwordRules,
      'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 numeric digit!',
    ),
});

const RegistrationScreen = ({navigation}) => {
  // use the useContext hook to get the user data value
  const {setUserToken, setUserData} = useContext(AuthContext);

  // loading state
  const [loading, setLoading] = React.useState(false);

  // show password
  const [showPassword, setShowPassword] = React.useState(true);

  // catch errors
  const [errorDisplay, setErrorDisplay] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  // form fields
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [gender, setGender] = React.useState(null);

  // handle dropdown
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    {label: 'Female', value: 'Female'},
    {label: 'Male', value: 'Male'},
    {label: 'Other', value: 'Other'},
  ]);

  // Accept terms and conditions
  const [agree, setAgree] = React.useState(false);

  const toggleCheckbox = () => {
    setAgree(!agree);
  };

  // get reference to the users collection
  const db = firestore().collection('Users');

  // create a new user using firebase authentication and add the user details to the database
  const createUser = async (email, password, username, phone, gender) => {
    if (agree) {
      try {
        // set loading to true before creating the user
        setLoading(true);

        // Create a user with email and password using Firebase authentication
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(userRecord => {
            // Get the user uid
            var uid = userRecord.uid;
            // Save the other data in Firebase database using the uid as the document id
            return firebase.firestore().collection('Users').doc(uid).set({
              email: email,
              username: username,
              phone_number: phone,
              gender: gender,
            });
          })
          .then(() => {
            // Get the user token with getIdToken method
            return firebase.auth().currentUser.getIdToken();
          })
          .then(token => {
            // Set the user token in the global state
            setUserToken(token);
          })
          .then(() => {
            // Set the isLoading state to false to hide the loading screen
            setLoading(false);
            // Navigate to the next screen or show a success message
          })
          .catch(error => {
            // set loading to false if there is an error
            setLoading(false);

            // catch errors
            switch (error.code) {
              case 'auth/email-already-in-use':
                setErrorDisplay(true);
                setErrorMessage('Email address is already in use!');
                break;
              case 'auth/network-request-failed':
                setErrorDisplay(true);
                setErrorMessage('interrupted connection or unreachable host!');
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
            alert('Something went wrong! please try again' + error);
            break;
        }
      }
    } else {
      alert('Please accept the terms and conditions to continue!');
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
        username: '',
        email: '',
        phone: '',
        password: '',
        gender: '',
      }}
      validateOnMount={true}
      validationSchema={registrationValidationSchema}
      onSubmit={values => {
        createUser(
          values.email,
          values.password,
          values.username,
          values.phone,
          values.gender,
        );
        setEmail(values.email);
        setUsername(values.username);
        setPhone(values.phone);
        setPassword(values.password);
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
        touched,
      }) => (
        <AuthScreen form_title="SIGN UP FORM">
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
                <Text style={Styles.label}>Username</Text>
                <TextInput
                  style={Styles.input}
                  placeholder=""
                  onBlur={handleBlur('username')}
                  value={values.username}
                  onChangeText={handleChange('username')}
                />
                {errors.username && touched.username && (
                  <Text style={Styles.error}>{errors.username}</Text>
                )}
              </View>
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
                <Text style={Styles.label}>Phone Number</Text>
                <TextInput
                  style={Styles.input}
                  placeholder=""
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                />
                {errors.phone && touched.phone && (
                  <Text style={Styles.error}>{errors.phone}</Text>
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

              {/* dropdown */}
              <View style={{paddingTop: 30, paddingBottom: 20}}>
                <DropDownPicker
                  listMode="SCROLLVIEW"
                  showsVerticalScrollIndicator={false}
                  open={open}
                  value={gender}
                  items={items}
                  listItemLabelStyle={{color: COLORS.white}}
                  setOpen={setOpen}
                  setValue={setGender}
                  setItems={setItems}
                  onChangeValue={handleChange('gender')}
                  onBlur={handleBlur('gender')}
                  placeholder="Select your Gender"
                  dropDownDirection="TOP"
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>

              {/* checkbox */}
              <Checkbox
                text="I agree to the terms & conditions"
                setAgree={toggleCheckbox}
                agree={agree}
              />

              {/* buttons */}
              <View style={Styles.recButton}>
                <RecButton
                  text="Sign Up"
                  bgColor={isValid && agree ? COLORS.primary : COLORS.gray}
                  textColor={COLORS.white}
                  onPress={handleSubmit}
                  w="100%"
                />
                <View style={Styles.separatorWrapper}>
                  <View style={Styles.separator}></View>
                  <Text style={Styles.separatorText}>OR</Text>
                  <View style={Styles.separator}></View>
                </View>
                <RecButton
                  text="Login"
                  bgColor={COLORS.secondary}
                  textColor={COLORS.primary}
                  onPress={() => navigation.push('Login')}
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
  // Styles for a dropdown menu container
  dropdownContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 10,
  },

  // Styles for a dropdown menu
  dropdownStyle: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
  },

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

export default RegistrationScreen;
